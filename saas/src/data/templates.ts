import { Template } from "@/types/portfolio";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { ProfessionalTemplate } from "@/components/templates/professional-template";

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Gradient",
    component: ModernTemplate,
    preview: "/templates/modern.png",
    colors: ["#0ea5e9", "#22d3ee", "#6366f1"],
    sections: ["about", "skills", "projects", "contact"],
    description: "Bold gradients, large cards, and skill badges."
  },
  {
    id: "minimal",
    name: "Minimal Monotype",
    component: MinimalTemplate,
    preview: "/templates/minimal.png",
    colors: ["#0f172a", "#1e293b", "#334155"],
    sections: ["about", "projects", "contact"],
    description: "Editorial typography with ultra-clean layout."
  },
  {
    id: "professional",
    name: "Professional Split",
    component: ProfessionalTemplate,
    preview: "/templates/professional.png",
    colors: ["#0f172a", "#2dd4bf", "#f97316"],
    sections: ["hero", "experience", "projects"],
    description: "Executive summary with career timeline."
  }
];

export const DEFAULT_TEMPLATE_ID = templates[0].id;

export const templateMetadata = templates.map(
  ({ component: _component, ...rest }) => rest
);


