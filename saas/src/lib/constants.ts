import { PortfolioData } from "@/types/portfolio";
import { nanoid } from "nanoid";

export const defaultPortfolioData: PortfolioData = {
  name: "Ada Lovelace",
  headline: "Product-focused Software Engineer",
  bio: "I build resilient, human-centered experiences with TypeScript, design systems, and AI-native workflows.",
  location: "Remote · Worldwide",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Prisma",
    "Tailwind",
    "PostgreSQL"
  ],
  projects: [
    {
      id: nanoid(),
      title: "Realtime Portfolio Builder",
      description: "Drag-and-drop editor for generating designer-ready portfolios with instant previews.",
      tech: ["Next.js", "Redis", "Stripe"],
      link: "",
      repo: ""
    }
  ],
  experience: [
    {
      id: nanoid(),
      company: "Flowstack",
      role: "Staff Frontend Engineer",
      startDate: "2021",
      endDate: "Present",
      bullets: [
        "Shipped a component API powering 200+ customer dashboards.",
        "Partnered with design to reduce onboarding time by 40%."
      ]
    }
  ],
  education: [
    {
      id: nanoid(),
      school: "University of Examples",
      degree: "B.Tech Computer Science",
      startYear: "2014",
      endYear: "2018"
    }
  ],
  contact: {
    email: "ada@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://adalovelace.dev",
    github: "https://github.com/adalovelace",
    linkedin: "https://linkedin.com/in/adalovelace"
  }
};


