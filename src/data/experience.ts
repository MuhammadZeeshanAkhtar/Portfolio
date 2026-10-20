import type { Experience } from '../types';

/** Source: LinkedIn Experience section (+ CV and LinkedIn posts for details). Newest first. */
export const experience: Experience[] = [
  {
    id: 'u-joy',
    role: 'Software Engineer',
    company: 'U-JOY Limited',
    companyNote: 'UK-based consumer & e-commerce company, Manchester',
    type: 'Part-time',
    period: 'Jan 2026 – Present',
    location: 'Remote',
    current: true,
    summary: '',
    highlights: [
      'Building the U-JOY Limited company website.',
      'Managing the website day to day: updates, content and maintenance.',
    ],
    skills: [],
  },
  {
    id: 'sigma-evolution',
    role: 'AI Engineer',
    company: 'Sigma Evolution',
    type: 'Internship',
    period: 'Aug 2026 – Oct 2026 · 3 months',
    location: 'Islamabad, Pakistan · On-site',
    current: false,
    summary: '',
    highlights: [],
    skills: [],
    projects: [
      { projectId: 'zufishan-islamic-lms', label: 'Zufishan web application', repoUrl: 'https://github.com/MuhammadZeeshanAkhtar/Zufishan' },
      { projectId: 'sigmawork-ai-career-studio', label: 'SigmaWork AI Career Studio', repoUrl: 'https://github.com/MuhammadZeeshanAkhtar/sigmawork-ai-modules' },
      { projectId: 'nikahmate', label: 'NikahMate (Rishta) app', repoUrl: 'https://github.com/MuhammadZeeshanAkhtar/Rishta' },
    ],
  },
  {
    id: 'vortex-tech',
    role: 'AI & Machine Learning Intern',
    company: 'VORTEX TECH',
    type: 'Internship · Completed',
    period: 'Jul 2026 · 1 month',
    location: 'Remote',
    current: false,
    summary:
      'Worked on real-world AI and Machine Learning projects and gained hands-on experience through practical development and mentorship.',
    highlights: [
      'ETL, data cleaning, transformation and exploratory data analysis.',
      'Machine learning model development with Scikit-learn.',
      'Received the "AI & ML Engineer" internship certificate (Jul 2026).',
    ],
    skills: ['Machine Learning', 'Data Analysis', 'Python', 'Scikit-learn'],
    links: [
      { label: 'Week 1 notebooks', url: 'https://github.com/MuhammadZeeshanAkhtar/vortextech-aiml-week1' },
      { label: 'Week 2 notebooks', url: 'https://github.com/MuhammadZeeshanAkhtar/vortextech-aiml-week2' },
    ],
  },
];
