import { NextResponse } from "next/server";
import { PlanTier } from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitizePortfolioJson } from "@/lib/security";
import { slugify } from "@/lib/slugify";
import { portfolioPayloadSchema } from "@/lib/validators/portfolio";
import { templates } from "@/data/templates";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = portfolioPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const payload = parsed.data;
  const sanitizedData = sanitizePortfolioJson(payload.data);
  const sanitizedConfig = sanitizePortfolioJson(payload.config);
  const subdomain = slugify(payload.subdomain);

  const templateExists = templates.some(
    (template) => template.id === payload.templateId
  );
  if (!templateExists) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const userPortfoliosCount = await prisma.portfolio.count({
    where: { userId: session.user.id }
  });

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id }
  });

  if (
    (!payload.portfolioId && subscription?.plan === PlanTier.FREE && userPortfoliosCount >= 1) ||
    (!payload.portfolioId && !subscription && userPortfoliosCount >= 1)
  ) {
    return NextResponse.json(
      { error: "Upgrade required to create more portfolios" },
      { status: 402 }
    );
  }

  const existingSlug = await prisma.portfolio.findUnique({
    where: { subdomain }
  });

  if (existingSlug && existingSlug.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Subdomain already in use" },
      { status: 409 }
    );
  }

  const portfolio = payload.portfolioId
    ? await prisma.portfolio.update({
        where: {
          id: payload.portfolioId,
          userId: session.user.id
        },
        data: {
          title: payload.title,
          subdomain,
          templateId: payload.templateId,
          data: sanitizedData,
          config: sanitizedConfig,
          published: false
        }
      })
    : await prisma.portfolio.create({
        data: {
          title: payload.title,
          subdomain,
          templateId: payload.templateId,
          data: sanitizedData,
          config: sanitizedConfig,
          userId: session.user.id
        }
      });

  return NextResponse.json({ portfolio });
}


