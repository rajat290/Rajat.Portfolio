export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
};

export type PortfolioExperience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  bullets: string[];
};

export type PortfolioEducation = {
  id: string;
  school: string;
  degree: string;
  startYear: string;
  endYear?: string;
};

export type PortfolioContact = {
  email: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
};

export type PortfolioData = {
  name: string;
  headline: string;
  bio: string;
  location?: string;
  skills: string[];
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  contact: PortfolioContact;
};

export type TemplateRenderProps = {
  data: PortfolioData;
  accentColor: string;
  primaryColor: string;
};

export interface Template {
  id: string;
  name: string;
  component: React.ComponentType<TemplateRenderProps>;
  preview: string;
  colors: string[];
  sections: string[];
  description: string;
}


