"use client";

import { TemplateRenderProps } from "@/types/portfolio";

export function ProfessionalTemplate({
  data,
  primaryColor,
  accentColor
}: TemplateRenderProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white text-slate-900 shadow-xl">
      <div
        className="bg-slate-900 p-10 text-white"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
      >
        <p className="text-sm uppercase tracking-[0.5em] text-white/70">
          {data.headline}
        </p>
        <h1 className="mt-4 text-4xl font-bold">{data.name}</h1>
        <p className="mt-2 max-w-xl text-base text-white/80">{data.bio}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
          <span>{data.contact.email}</span>
          {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
          {data.contact.website && <span>{data.contact.website}</span>}
        </div>
      </div>

      <div className="grid gap-8 p-10 md:grid-cols-2">
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Experience
          </h2>
          <div className="mt-4 space-y-4">
            {data.experience.slice(0, 3).map((exp) => (
              <div key={exp.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{exp.company}</span>
                  <span>
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{exp.role}</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {exp.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Projects
          </h2>
          <div className="mt-4 space-y-4">
            {data.projects.slice(0, 3).map((project) => (
              <div key={project.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
                      style={{ color: accentColor }}
                    >
                      View
                    </a>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}


