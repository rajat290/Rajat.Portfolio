import { Link } from "react-router-dom";

const BUILDER_URL =
  import.meta.env.VITE_RESUME_BUILDER_URL || "https://myplatform.com";

const steps = [
  "Sign in with Google, GitHub, or email to get your dashboard.",
  "Upload your résumé or fill the multi-step form to auto-populate data.",
  "Pick a template, tweak colors/sections, and preview live.",
  "Hit Publish to get a unique URL (or connect your own domain)."
];

const features = [
  "Multi-tenant Next.js 14 platform with Prisma + Redis",
  "AI résumé parsing with manual overrides",
  "Drag-and-drop builder and template presets",
  "Free vs Pro vs Enterprise billing via Stripe",
  "Live portfolio URLs using ISR for instant updates"
];

const ResumeBuilder = () => {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-sky-400">
            Portfolio SaaS
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white">
            Resume → Portfolio in minutes
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Use the new builder to onboard users, import their résumé, customize
            templates, and publish portfolio sites on unique URLs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              How it works
            </p>
            <ul className="mt-4 space-y-4 text-white/80">
              {steps.map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="text-sky-300">▹</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <a
              href={BUILDER_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Launch Resume Builder
            </a>
            <p className="mt-3 text-center text-xs text-white/60">
              Opens the Next.js dashboard in a new tab.
            </p>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              Why we built it
            </p>
            <p className="text-white/80">
              This SaaS layer is hosted in the new `saas/` workspace (Next.js 14
              App Router). Hook it up to Neon/Postgres, Upstash Redis, and
              Stripe so your portfolio visitors can seamlessly create their own
              sites while you manage subscriptions.
            </p>
            <ul className="space-y-3 text-white/80">
              {features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="text-sky-300">★</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-dashed border-white/20 p-4 text-sm text-white/70">
              <p className="font-semibold text-white">Need access?</p>
              <p className="mt-1">
                Point this CTA to your deployed builder or keep it local while
                you finish the Neon/Upstash/Stripe setup. The link above is
                driven by <code>VITE_RESUME_BUILDER_URL</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-white/60">
          Looking for classic portfolio work?{" "}
          <Link to="/projects" className="text-sky-400 underline">
            Explore recent builds
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilder;


