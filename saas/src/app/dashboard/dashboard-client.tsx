"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { defaultPortfolioData } from "@/lib/constants";
import { slugify } from "@/lib/slugify";
import { templates, DEFAULT_TEMPLATE_ID } from "@/data/templates";
import { PortfolioData } from "@/types/portfolio";
import { ResumeDropzone } from "@/components/builder/resume-dropzone";
import { TemplatePicker } from "@/components/builder/template-picker";
import { CustomizationPanel } from "@/components/builder/customization-panel";
import { PortfolioWizard } from "@/components/builder/portfolio-wizard";
import { LivePreview } from "@/components/builder/live-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PortfolioRecord = {
  id: string;
  title: string;
  templateId: string;
  subdomain: string;
  data: PortfolioData;
  config: Record<string, any>;
  published: boolean;
};

type BuilderConfig = {
  primaryColor: string;
  accentColor: string;
  sections: Record<string, boolean>;
};

type Props = {
  initialPortfolio: PortfolioRecord | null;
};

export function DashboardClient({ initialPortfolio }: Props) {
  const { data: session } = useSession();
  const defaultTemplate = templates.find(
    (template) => template.id === (initialPortfolio?.templateId ?? DEFAULT_TEMPLATE_ID)
  );

  const [portfolioId, setPortfolioId] = useState(initialPortfolio?.id ?? null);
  const [title, setTitle] = useState(initialPortfolio?.title ?? "My portfolio");
  const [subdomain, setSubdomain] = useState(
    initialPortfolio?.subdomain ?? slugify(session?.user?.id ?? "username")
  );
  const [templateId, setTemplateId] = useState(
    initialPortfolio?.templateId ?? DEFAULT_TEMPLATE_ID
  );
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(
    initialPortfolio?.data ?? defaultPortfolioData
  );
  const [builderConfig, setBuilderConfig] = useState<BuilderConfig>(
    (initialPortfolio?.config as BuilderConfig) ?? {
      primaryColor: defaultTemplate?.colors[0] ?? "#0ea5e9",
      accentColor: defaultTemplate?.colors[1] ?? "#22d3ee",
      sections: Object.fromEntries(
        (defaultTemplate?.sections ?? []).map((section) => [section, true])
      )
    }
  );

  const saveMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/portfolios/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          portfolioId,
          title,
          subdomain,
          templateId,
          data: portfolioData,
          config: builderConfig
        })
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? "Unable to save portfolio");
      }

      return response.json();
    },
    onSuccess: (payload) => {
      setPortfolioId(payload.portfolio.id);
      toast.success("Portfolio saved");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/portfolios/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ portfolioId })
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? "Unable to publish");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Portfolio published. Visit your live URL.");
    },
    onError: (error: Error) => toast.error(error.message)
  });

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
          Builder
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Craft your portfolio in minutes
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <ResumeDropzone onParsed={setPortfolioData} />
          <PortfolioWizard data={portfolioData} onChange={setPortfolioData} />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Portfolio title
            </label>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 bg-slate-950"
            />
            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              URL
            </label>
            <div className="mt-2 flex items-center gap-3">
              <Input
                value={subdomain}
                onChange={(event) => setSubdomain(slugify(event.target.value))}
                className="bg-slate-950"
              />
              <span className="text-sm text-slate-400">/ {subdomain}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Your site will be available at myplatform.com/{subdomain}
            </p>
          </div>

          <TemplatePicker value={templateId} onChange={setTemplateId} />

          <CustomizationPanel
            templateId={templateId}
            value={builderConfig}
            onChange={setBuilderConfig}
          />

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              Actions
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save draft"
                )}
              </Button>
              <Button
                variant="secondary"
                disabled={!portfolioId || publishMutation.isPending}
                onClick={() => publishMutation.mutate()}
              >
                {publishMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Publish"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://myplatform.com/${subdomain}`
                  );
                  toast.success("URL copied to clipboard");
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Copy link
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Live preview
          </p>
          <p className="text-lg font-semibold text-white">
            {title} · {subdomain}
          </p>
        </div>
        <LivePreview
          templateId={templateId}
          data={portfolioData}
          primaryColor={builderConfig.primaryColor}
          accentColor={builderConfig.accentColor}
        />
      </div>
    </div>
  );
}


