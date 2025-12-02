import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
  description: z.string().min(4),
  tech: z.array(z.string()),
  link: z.string().url().optional().or(z.literal("")),
  repo: z.string().url().optional().or(z.literal(""))
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  bullets: z.array(z.string())
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  startYear: z.string(),
  endYear: z.string().optional()
});

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal(""))
});

export const portfolioDataSchema = z.object({
  name: z.string().min(2),
  headline: z.string(),
  bio: z.string(),
  location: z.string().optional(),
  skills: z.array(z.string()),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  contact: contactSchema
});

export const portfolioPayloadSchema = z.object({
  portfolioId: z.string().optional(),
  title: z.string().min(2),
  subdomain: z.string().min(3),
  templateId: z.string(),
  data: portfolioDataSchema,
  config: z.record(z.any())
});


