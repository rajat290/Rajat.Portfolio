import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  const portfolio = await prisma.portfolio.findFirst({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <DashboardClient
      initialPortfolio={
        portfolio
          ? JSON.parse(JSON.stringify(portfolio))
          : null
      }
    />
  );
}


