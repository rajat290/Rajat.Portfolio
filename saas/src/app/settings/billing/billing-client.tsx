"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type Props = {
  plan: string;
};

export function BillingClient({ plan }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = (targetPlan: string) => {
    startTransition(async () => {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan })
      });

      if (!response.ok) {
        const payload = await response.json();
        toast.error(payload.error ?? "Unable to start checkout");
        return;
      }

      const payload = await response.json();
      if (payload.url) {
        window.location.href = payload.url;
      }
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
        Current Plan
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">{plan}</p>
      <p className="mt-2 text-sm text-slate-400">
        Upgrade to unlock more templates, portfolios, and analytics.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button disabled={isPending} onClick={() => handleCheckout("PRO")}>
          Upgrade to Pro
        </Button>
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() => handleCheckout("ENTERPRISE")}
        >
          Talk to sales
        </Button>
      </div>
    </div>
  );
}


