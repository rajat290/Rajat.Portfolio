import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { PlanTier, SubscriptionStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "Account already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      subscription: {
        create: {
          plan: PlanTier.FREE,
          status: SubscriptionStatus.ACTIVE
        }
      }
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  });

  return NextResponse.json({ user });
}


