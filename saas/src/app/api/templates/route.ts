import { NextResponse } from "next/server";
import { templates } from "@/data/templates";

export function GET() {
  return NextResponse.json(
    templates.map((template) => ({
      id: template.id,
      name: template.name,
      preview: template.preview,
      colors: template.colors,
      sections: template.sections,
      description: template.description
    }))
  );
}


