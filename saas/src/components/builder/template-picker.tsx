"use client";

import Image from "next/image";

import { templates } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (templateId: string) => void;
};

export function TemplatePicker({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Templates
          </p>
          <p className="text-lg font-semibold text-white">
            Choose a starting point
          </p>
        </div>
        <Button variant="ghost" className="text-xs uppercase tracking-wide">
          Preview
        </Button>
      </div>
      <div className="grid gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            className={cn(
              "flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-900 bg-slate-900/60 p-3 text-left transition hover:border-sky-500",
              value === template.id && "border-sky-500 bg-slate-900"
            )}
            onClick={() => onChange(template.id)}
          >
            <div className="h-20 w-32 overflow-hidden rounded-xl bg-slate-800">
              <Image
                src={template.preview || "/images/template-placeholder.png"}
                alt={template.name}
                width={200}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{template.name}</p>
              <p className="text-xs text-slate-400">{template.description}</p>
              <div className="mt-2 flex gap-1">
                {template.colors.map((color) => (
                  <span
                    key={color}
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


