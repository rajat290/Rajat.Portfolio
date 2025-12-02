import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { username: string };
};

export async function GET(_request: Request, { params }: Params) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { subdomain: params.username },
    select: {
      title: true,
      data: true,
      config: true,
      templateId: true,
      published: true,
      updatedAt: true
    }
  });

  if (!portfolio || !portfolio.published) {
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
  }

  return NextResponse.json(portfolio);
}


