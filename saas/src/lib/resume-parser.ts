import { env } from "@/lib/env";
import { PortfolioData } from "@/types/portfolio";

const fallbackData: PortfolioData = {
  name: "Your Name",
  headline: "Full-stack Developer",
  bio: "Detail-oriented engineer with a passion for building delightful product experiences.",
  location: "Remote",
  skills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"],
  projects: [
    {
      id: "proj-1",
      title: "AI Portfolio Builder",
      description: "Multi-tenant platform that generates developer portfolios using AI.",
      tech: ["Next.js", "Prisma", "Tailwind"],
      link: "",
      repo: ""
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Acme Corp",
      role: "Senior Software Engineer",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Led the delivery of a customer-facing portal used by 30k+ users.",
        "Mentored 5 engineers and standardized the component library."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Example University",
      degree: "B.S. Computer Science",
      startYear: "2014",
      endYear: "2018"
    }
  ],
  contact: {
    email: "you@example.com",
    phone: "",
    website: "",
    github: "",
    linkedin: ""
  }
};

export async function parseResumeFile(
  _fileBuffer: Buffer,
  _filename: string
): Promise<{ data: PortfolioData; confidence: number }> {
  if (env.SORCERY_API_KEY) {
    // Sorcery API integration would go here. For now we return the fallback data.
  }

  return {
    data: fallbackData,
    confidence: 0.3
  };
}


