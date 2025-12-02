"use client";

import { TemplateRenderProps } from "@/types/portfolio";

export function MinimalTemplate({
  data,
  primaryColor
}: TemplateRenderProps) {
  return (
    <article className="space-y-10 rounded-2xl border border-slate-200 bg-white p-10 text-slate-900">
      <header className="space-y-2 text-center">
        <h1 className="text-5xl font-extralight uppercase tracking-[0.5em]">
          {data.name}
        </h1>
        <p className="text-sm tracking-[0.4em] text-slate-500">
          {data.headline}
        </p>
        <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
          {data.location}
        </p>
      </header>

      <section className="space-y-6 text-sm leading-relaxed text-slate-700">
        <p>{data.bio}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h2
              className="text-xs uppercase tracking-[0.4em] text-slate-500"
              style={{ color: primaryColor }}
            >
              Contact
            </h2>
            <ul className="mt-2 space-y-1">
              <li>{data.contact.email}</li>
              {data.contact.website && <li>{data.contact.website}</li>}
              {data.contact.linkedin && <li>{data.contact.linkedin}</li>}
            </ul>
          </div>
          <div>
            <h2
              className="text-xs uppercase tracking-[0.4em] text-slate-500"
              style={{ color: primaryColor }}
            >
              Skills
            </h2>
            <p className="mt-2">
              {data.skills.slice(0, 10).join(" · ")}
              {data.skills.length > 10 && " · ..."}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2
          className="text-xs uppercase tracking-[0.3em] text-slate-600"
          style={{ color: primaryColor }}
        >
          Projects
        </h2>
        {data.projects.slice(0, 3).map((project) => (
          <div
            key={project.id}
            className="border-t border-slate-200 pt-4 text-sm text-slate-700"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{project.title}</span>
              {project.link && (
                <a
                  href={project.link}
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: primaryColor }}
                >
                  Live
                </a>
              )}
            </div>
            <p className="mt-2">{project.description}</p>
          </div>
        ))}
      </section>
    </article>
  );
}


