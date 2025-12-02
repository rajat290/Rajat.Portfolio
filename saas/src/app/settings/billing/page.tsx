import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BillingClient } from "./billing-client";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id }
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Billing</h1>
      <p className="mt-2 text-sm text-slate-400">
        Manage your subscription and invoices.
      </p>
      <div className="mt-8">
        <BillingClient plan={subscription?.plan ?? "FREE"} />
      </div>
    </main>
  );
}


