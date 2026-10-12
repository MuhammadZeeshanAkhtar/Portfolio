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
    summary:
      'Software engineering for a UK-based company building modern consumer brands and e-commerce experiences.',
    highlights: ['TODO: add 2–3 bullet points about your work at U-JOY (LinkedIn has no description yet)'],
    skills: [],
  },
  {
    id: 'sigma-evolution',
    role: 'AI Engineer',
    company: 'Sigma Evolution',
    type: 'Internship',
    period: 'Aug 2026 – Present',
    location: 'Islamabad, Pakistan · On-site',
    current: true,
    summary: 'Building AI-powered full-stack web applications on industry-level, real-world projects.',
    highlights: [
      'Developed AI-powered full-stack web applications, integrating AI features, APIs and databases.',
      'Integrated LLM-based features, including prompt engineering for user-facing AI workflows.',
      'Built and consumed REST APIs to connect AI modules with application frontends.',
      'Shipped SigmaWork (AI career studio) and building Zufishan (AI-powered Islamic LMS).',
    ],
    skills: ['Artificial Intelligence', 'LLMs', 'RAG', 'Vector Databases', 'React.js', 'JavaScript', 'Data Science'],
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
