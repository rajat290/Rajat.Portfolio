import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { templates } from "@/data/templates";

type Params = {
  params: { username: string };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const portfolios = await prisma.portfolio.findMany({
    where: { published: true },
    take: 10,
    select: { subdomain: true }
  });

  return portfolios.map((portfolio) => ({
    username: portfolio.subdomain
  }));
}

export default async function PortfolioPage({ params }: Params) {
  const record = await prisma.portfolio.findUnique({
    where: { subdomain: params.username, published: true },
    select: {
      title: true,
      templateId: true,
      data: true,
      config: true
    }
  });

  if (!record) {
    notFound();
  }

  const template = templates.find(
    (item) => item.id === record.templateId
  );

  if (!template) {
    notFound();
  }

  const TemplateComponent = template.component;
  const config = record.config as { primaryColor?: string; accentColor?: string };

  return (
    <div className="min-h-screen bg-slate-100 py-14">
      <TemplateComponent
        data={record.data as any}
        primaryColor={config.primaryColor ?? "#0ea5e9"}
        accentColor={config.accentColor ?? "#22d3ee"}
      />
    </div>
  );
}


