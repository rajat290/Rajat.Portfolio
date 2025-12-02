"use client";

import { templates } from "@/data/templates";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Config = {
  primaryColor: string;
  accentColor: string;
  sections: Record<string, boolean>;
};

type Props = {
  templateId: string;
  value: Config;
  onChange: (config: Config) => void;
};

export function CustomizationPanel({ templateId, value, onChange }: Props) {
  const template = templates.find((item) => item.id === templateId);
  if (!template) return null;

  const toggleSection = (section: string) => {
    onChange({
      ...value,
      sections: {
        ...value.sections,
        [section]: !value.sections[section]
      }
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
        Customize
      </p>
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Primary Color
        </label>
        <Input
          type="color"
          value={value.primaryColor}
          onChange={(event) =>
            onChange({ ...value, primaryColor: event.target.value })
          }
          className="h-12 w-full cursor-pointer rounded-xl bg-slate-950"
        />
      </div>
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Accent Color
        </label>
        <Input
          type="color"
          value={value.accentColor}
          onChange={(event) =>
            onChange({ ...value, accentColor: event.target.value })
          }
          className="h-12 w-full cursor-pointer rounded-xl bg-slate-950"
        />
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Sections
        </p>
        <div className="space-y-2">
          {template.sections.map((section) => (
            <button
              key={section}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border border-slate-800 px-3 py-2 text-left",
                value.sections[section] && "border-sky-500 bg-slate-900"
              )}
              onClick={() => toggleSection(section)}
            >
              <span className="text-sm capitalize text-slate-200">
                {section}
              </span>
              <span
                className={cn(
                  "h-5 w-10 rounded-full border border-slate-700 bg-slate-800",
                  value.sections[section] && "border-sky-500 bg-sky-500/20"
                )}
              >
                <span
                  className={cn(
                    "block h-4 w-4 translate-x-1 rounded-full bg-slate-500 transition",
                    value.sections[section] && "translate-x-5 bg-sky-400"
                  )}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


