"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { PlusCircle, Trash2 } from "lucide-react";

import { PortfolioData } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Props = {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
};

const steps = [
  { id: "basics", label: "Bio" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" }
];

export function PortfolioWizard({ data, onChange }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const update = (partial: Partial<PortfolioData>) => {
    onChange({ ...data, ...partial });
  };

  const stepPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-500">
          <span>{steps[currentStep].label}</span>
          <span>
            {currentStep + 1}/{steps.length}
          </span>
        </div>
        <Progress value={stepPercentage} />
      </div>

      <div className="space-y-4">
        {currentStep === 0 && (
          <div className="space-y-4">
            <Input
              value={data.name}
              onChange={(event) => update({ name: event.target.value })}
              placeholder="Full name"
            />
            <Input
              value={data.headline}
              onChange={(event) => update({ headline: event.target.value })}
              placeholder="Headline"
            />
            <Textarea
              value={data.bio}
              onChange={(event) => update({ bio: event.target.value })}
              placeholder="Short bio"
            />
            <Input
              value={data.location ?? ""}
              onChange={(event) => update({ location: event.target.value })}
              placeholder="Location"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                value={data.contact.email}
                onChange={(event) =>
                  update({
                    contact: { ...data.contact, email: event.target.value }
                  })
                }
                placeholder="Email"
              />
              <Input
                value={data.contact.website ?? ""}
                onChange={(event) =>
                  update({
                    contact: { ...data.contact, website: event.target.value }
                  })
                }
                placeholder="Website"
              />
              <Input
                value={data.contact.linkedin ?? ""}
                onChange={(event) =>
                  update({
                    contact: { ...data.contact, linkedin: event.target.value }
                  })
                }
                placeholder="LinkedIn"
              />
              <Input
                value={data.contact.github ?? ""}
                onChange={(event) =>
                  update({
                    contact: { ...data.contact, github: event.target.value }
                  })
                }
                placeholder="GitHub"
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <SkillsStep
            skills={data.skills}
            onChange={(skills) => update({ skills })}
          />
        )}

        {currentStep === 2 && (
          <CollectionStep
            title="Projects"
            items={data.projects}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", textarea: true },
              { key: "link", label: "Live URL" },
              { key: "repo", label: "Repository URL" },
              { key: "tech", label: "Tech (comma separated)" }
            ]}
            onAdd={() =>
              update({
                projects: [
                  ...data.projects,
                  {
                    id: nanoid(),
                    title: "",
                    description: "",
                    tech: [],
                    link: "",
                    repo: ""
                  }
                ]
              })
            }
            onChange={(items) =>
              update({
                projects: items.map((item) => ({
                  ...item,
                  tech:
                    typeof item.tech === "string"
                      ? item.tech.split(",").map((tech: string) => tech.trim())
                      : item.tech
                }))
              })
            }
          />
        )}

        {currentStep === 3 && (
          <CollectionStep
            title="Experience"
            items={data.experience}
            fields={[
              { key: "company", label: "Company" },
              { key: "role", label: "Role" },
              { key: "startDate", label: "Start" },
              { key: "endDate", label: "End" },
              { key: "bullets", label: "Highlights (one per line)", textarea: true }
            ]}
            onAdd={() =>
              update({
                experience: [
                  ...data.experience,
                  {
                    id: nanoid(),
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    bullets: []
                  }
                ]
              })
            }
            onChange={(items) =>
              update({
                experience: items.map((item) => ({
                  ...item,
                  bullets: Array.isArray(item.bullets)
                    ? item.bullets
                    : String(item.bullets)
                        .split("\n")
                        .map((bullet) => bullet.trim())
                        .filter(Boolean)
                }))
              })
            }
          />
        )}

        {currentStep === 4 && (
          <CollectionStep
            title="Education"
            items={data.education}
            fields={[
              { key: "school", label: "School" },
              { key: "degree", label: "Degree" },
              { key: "startYear", label: "Start Year" },
              { key: "endYear", label: "End Year" }
            ]}
            onAdd={() =>
              update({
                education: [
                  ...data.education,
                  {
                    id: nanoid(),
                    school: "",
                    degree: "",
                    startYear: "",
                    endYear: ""
                  }
                ]
              })
            }
            onChange={(items) => update({ education: items })}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
        >
          Back
        </Button>
        <Button
          onClick={() =>
            setCurrentStep((step) => Math.min(steps.length - 1, step + 1))
          }
        >
          {currentStep === steps.length - 1 ? "Review" : "Next"}
        </Button>
      </div>
    </div>
  );
}

function SkillsStep({
  skills,
  onChange
}: {
  skills: string[];
  onChange: (skills: string[]) => void;
}) {
  const [value, setValue] = useState("");

  const addSkill = () => {
    if (!value.trim()) return;
    onChange([...skills, value.trim()]);
    setValue("");
  };

  const removeSkill = (skill: string) => {
    onChange(skills.filter((item) => item !== skill));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Add skill"
        />
        <Button type="button" onClick={addSkill}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1 text-sm text-slate-200"
          >
            {skill}
            <button
              className="text-xs text-slate-500 hover:text-rose-400"
              onClick={() => removeSkill(skill)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

type FieldConfig = {
  key: string;
  label: string;
  textarea?: boolean;
};

type CollectionItem = Record<string, any> & { id: string };

function CollectionStep({
  title,
  items,
  fields,
  onAdd,
  onChange
}: {
  title: string;
  items: CollectionItem[];
  fields: FieldConfig[];
  onAdd: () => void;
  onChange: (items: CollectionItem[]) => void;
}) {
  const updateItem = (index: number, key: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          {title}
        </p>
        <Button type="button" variant="ghost" onClick={onAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-2xl border border-slate-800 p-4"
          >
            {fields.map((field) =>
              field.textarea ? (
                <Textarea
                  key={field.key}
                  value={
                    Array.isArray(item[field.key])
                      ? item[field.key].join("\n")
                      : item[field.key] ?? ""
                  }
                  onChange={(event) =>
                    updateItem(index, field.key, event.target.value)
                  }
                  placeholder={field.label}
                />
              ) : (
                <Input
                  key={field.key}
                  value={Array.isArray(item[field.key]) ? "" : item[field.key] ?? ""}
                  onChange={(event) =>
                    updateItem(index, field.key, event.target.value)
                  }
                  placeholder={field.label}
                />
              )
            )}
            <button
              className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-400"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-3 w-3" />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


