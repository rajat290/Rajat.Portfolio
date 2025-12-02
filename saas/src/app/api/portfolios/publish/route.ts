import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId } = await request.json();
  if (!portfolioId) {
    return NextResponse.json({ error: "portfolioId required" }, { status: 400 });
  }

  const portfolio = await prisma.portfolio.update({
    where: { id: portfolioId, userId: session.user.id },
    data: {
      published: true,
      publishedAt: new Date()
    },
    select: {
      id: true,
      subdomain: true,
      updatedAt: true
    }
  });

  return NextResponse.json({ portfolio });
}


