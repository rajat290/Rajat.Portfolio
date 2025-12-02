"use client";

import { TemplateRenderProps } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";

export function ModernTemplate({
  data,
  primaryColor,
  accentColor
}: TemplateRenderProps) {
  return (
    <article
      className="space-y-12 rounded-3xl border border-slate-200 bg-white p-10 text-slate-900 shadow-2xl"
      style={{ borderColor: primaryColor }}
    >
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p
            className="text-sm uppercase tracking-[0.3em]"
            style={{ color: accentColor }}
          >
            {data.location}
          </p>
          <h1 className="text-4xl font-black">{data.name}</h1>
          <p className="text-lg text-slate-600">{data.headline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.slice(0, 6).map((skill) => (
            <Badge
              key={skill}
              className="border-slate-200 bg-slate-50 text-slate-700"
              style={{ borderColor: accentColor }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            About
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            {data.bio}
          </p>
        </div>
        <div className="space-y-3">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Contact
          </h2>
          <ul className="text-sm text-slate-600">
            <li>{data.contact.email}</li>
            {data.contact.website && <li>{data.contact.website}</li>}
            {data.contact.linkedin && <li>{data.contact.linkedin}</li>}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div
          className="h-px w-full"
          style={{ backgroundColor: primaryColor }}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-slate-600">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    className="border-none bg-slate-100 text-xs text-slate-700"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}


