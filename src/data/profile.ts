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
    'My final-year project, MindSense, is a multimodal depression screening and therapy-support platform that analyses text, voice and facial expressions. Our team won *1st Position* in the Software Engineering Department at the IIUI Career Expo 2026.',
    "Today I work part-time as a Software Engineer at U-JOY Limited, a UK-based consumer and e-commerce company, and as an AI Engineer intern at Sigma Evolution, where I build AI-powered full-stack products such as SigmaWork and Zufishan. I'm now focused on *AI agents and workflow automation* that take real business work off people's plates.",
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
    { label: 'Currently', value: 'Software Engineer @ U-JOY Limited · AI Engineer intern @ Sigma Evolution' },
    { label: 'Focus', value: 'AI agents, automation, applied ML' },
  ],
  focusAreas: ['AI Agents & Automation', 'Machine Learning', 'Computer Vision & NLP', 'Full-Stack AI Apps'],
};
