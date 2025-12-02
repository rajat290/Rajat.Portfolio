import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

const priceMap: Record<string, string | undefined> = {
  FREE: env.STRIPE_PRICE_FREE,
  PRO: env.STRIPE_PRICE_PRO,
  ENTERPRISE: env.STRIPE_PRICE_ENTERPRISE
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  const { plan } = await request.json();
  const priceId = priceMap[plan];

  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.NEXTAUTH_URL}/settings/billing?status=success`,
    cancel_url: `${env.NEXTAUTH_URL}/settings/billing?status=cancelled}`
  });

  return NextResponse.json({ url: checkout.url });
}


