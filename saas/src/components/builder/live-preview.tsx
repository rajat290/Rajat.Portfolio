"use client";

import { useMemo } from "react";

import { templates } from "@/data/templates";
import { PortfolioData } from "@/types/portfolio";

type Props = {
  templateId: string;
  data: PortfolioData;
  primaryColor: string;
  accentColor: string;
};

export function LivePreview({
  templateId,
  data,
  primaryColor,
  accentColor
}: Props) {
  const TemplateComponent = useMemo(
    () => templates.find((template) => template.id === templateId)?.component,
    [templateId]
  );

  if (!TemplateComponent) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10 text-center text-slate-400">
        Select a template to see a live preview.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="rounded-2xl bg-white p-8">
        <TemplateComponent
          data={data}
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
}


