import Link from "next/link";
import { templateMetadata } from "@/data/templates";

const pricing = [
  {
    name: "Free",
    price: "$0",
    description: "One portfolio, Modern + Minimal templates, resume parser.",
    features: [
      "1 published portfolio",
      "Modern & Minimal templates",
      "AI resume import",
      "Portfolio analytics lite"
    ]
  },
  {
    name: "Pro",
    price: "$18",
    description: "Multiple portfolios, custom colors, priority rebuilds.",
    features: [
      "Up to 5 portfolios",
      "All templates + custom colors",
      "Custom domains & analytics",
      "Priority AI parsing"
    ]
  },
  {
    name: "Enterprise",
    price: "Let's chat",
    description: "White-label builder for bootcamps, agencies, and teams.",
    features: [
      "Unlimited portfolios",
      "Team roles & SSO",
      "Dedicated account manager",
      "White-label / custom themes"
    ]
  }
];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-sky-400">
          Multi-tenant portfolio SaaS
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          From resume to live portfolio in under 5 minutes
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
          Import your resume, refine the data with our multi-step builder, then
          publish to a branded subdomain or custom domain powered by Next.js +
          Prisma + Redis. Templates update instantly thanks to ISR.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-md bg-sky-500 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-sky-400"
          >
            Get started free
          </Link>
          <Link
            href="#pricing"
            className="rounded-md border border-slate-700 px-8 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900/60"
          >
            View pricing
          </Link>
        </div>
      </section>

      <section
        id="templates"
        className="mt-20 grid gap-6 md:grid-cols-3"
      >
        {templateMetadata.map((template) => (
          <div
            key={template.id}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              {template.name}
            </p>
            <p className="mt-2 text-sm text-slate-300">{template.description}</p>
            <div className="mt-4 flex items-center gap-2">
              {template.colors.map((color) => (
                <span
                  key={color}
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Sections: {template.sections.join(", ")}
            </p>
          </div>
        ))}
      </section>

      <section id="pricing" className="mt-24 space-y-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Monetization-ready SaaS
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
                {tier.name}
              </p>
              <p className="mt-4 text-4xl font-bold text-white">{tier.price}</p>
              <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-white"
              >
                {tier.name === "Enterprise" ? "Contact sales" : "Start building"}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


