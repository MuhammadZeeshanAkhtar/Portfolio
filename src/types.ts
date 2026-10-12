/**
 * Shared content types. All portfolio content lives in src/data/*.ts and follows these shapes.
 *
 * Placeholder convention: any string that starts with "TODO:" is treated as missing content.
 * The UI hides or softens it in production and highlights it in development (npm run dev).
 */

export interface SocialLinks {
  linkedin: string;
  github: string;
  email: string;
  /** International format without spaces or "+", e.g. "923001234567". Leave "" to hide. */
  whatsapp: string;
}

export interface Profile {
  name: string;
  shortName: string;
  /** Role line under the name. */
  headline: string;
  /** One-line value statement. Wrap words in *asterisks* to highlight them in lime. */
  valueStatement: string;
  /** About paragraphs. *asterisks* highlight words. */
  about: string[];
  location: string;
  /** Phone shown next to the WhatsApp button, human-readable. */
  phoneDisplay: string;
  photo: { src: string; srcSet: string; alt: string; width: number; height: number };
  cvUrl: string;
  badge: string;
  socials: SocialLinks;
  quickFacts: { label: string; value: string }[];
  focusAreas: string[];
}

export type ProjectCategory = 'AI Agents' | 'Machine Learning' | 'Full-Stack';
export type ProjectStatus = 'Completed' | 'In progress' | 'Live';

export interface ArchitectureStep {
  title: string;
  detail: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  /** Where the project comes from: listed on LinkedIn, or new (not on LinkedIn yet). */
  source: 'LinkedIn' | 'New';
  period: string;
  context: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  role: string;
  architecture: ArchitectureStep[];
  /** Only real, verifiable results. Leave empty if there are none yet. */
  results: string[];
  team: string[];
  note?: string;
  githubUrl: string;
  liveUrl: string;
  demoVideoUrl: string;
  images: ProjectImage[];
  status: ProjectStatus;
  targetRoles: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyNote?: string;
  type: string;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  highlights: string[];
  skills: string[];
  links?: { label: string; url: string }[];
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  url?: string;
  highlight?: boolean;
  note?: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
  url?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  details: string[];
}
