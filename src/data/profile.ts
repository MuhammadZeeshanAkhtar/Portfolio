import type { Profile } from '../types';
import { asset } from '../lib/asset';

/**
 * Personal details. Sources: LinkedIn profile + contact info, GitHub profile README and CV (checked Oct 2026).
 * Wrap words in *asterisks* to render them with the lime highlight.
 */
export const profile: Profile = {
  name: 'Muhammad Zeeshan Akhtar',
  shortName: 'Zeeshan',
  headline: 'Software Engineer | AI & Machine Learning',
  valueStatement: 'Building smart *AI products* that *solve real problems*.',
  about: [
    "I'm a Software Engineer focused on *AI and Machine Learning*. I build end-to-end products: data and models on one side, reliable APIs and clean web interfaces on the other.",
    'My key project, *MindSense*, is a full-stack web application for multimodal depression screening and therapy support. Our team trained its text, voice and video models ourselves, and it won *1st Position* in the Software Engineering Department at the IIUI Career Expo 2026.',
    "I work part-time as a Software Engineer at U-JOY Limited, a UK-based consumer and e-commerce company, where I'm building and managing the company website. During my AI Engineer internship at Sigma Evolution (Aug–Oct 2026) I worked on the Zufishan web application, SigmaWork AI Career Studio and the NikahMate app. Next I'm going deeper into *AI agents and workflow automation*.",
  ],
  location: 'Islamabad, Pakistan',
  phoneDisplay: '+92 349 1725364',
  photo: {
    src: asset('assets/zeeshan-480.webp'),
    srcSet: `${asset('assets/zeeshan-480.webp')} 480w, ${asset('assets/zeeshan-720.webp')} 720w`,
    alt: 'Portrait of Muhammad Zeeshan Akhtar wearing a dark waistcoat over a white shalwar kameez',
    width: 480,
    height: 600,
  },
  cvUrl: asset('assets/Muhammad_Zeeshan_Akhtar_CV.pdf'),
  badge: '1st Position – IIUI Career Expo 2026',
  socials: {
    linkedin: 'https://www.linkedin.com/in/muhammadzeeshanakhtar/',
    github: 'https://github.com/MuhammadZeeshanAkhtar',
    email: 'mianzeeshan4381@gmail.com',
    whatsapp: '923491725364',
  },
  quickFacts: [
    { label: 'Based in', value: 'Islamabad, Pakistan' },
    { label: 'Degree', value: 'BS Software Engineering, IIUI (2022–2026)' },
    { label: 'Currently', value: 'Software Engineer @ U-JOY Limited (part-time)' },
    { label: 'Focus', value: 'Full-stack AI apps, applied ML, AI agents' },
  ],
  focusAreas: ['Full-Stack AI Apps', 'Machine Learning', 'Computer Vision & NLP', 'AI Agents & Automation'],
};
