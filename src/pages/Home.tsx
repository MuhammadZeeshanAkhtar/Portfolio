import { useDocumentTitle } from '../lib/useDocumentTitle';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { Certificates } from '../sections/Certificates';
import { Education } from '../sections/Education';
import { Experience } from '../sections/Experience';
import { FeaturedProject } from '../sections/FeaturedProject';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <About />
      <FeaturedProject />
      <Projects />
      <Experience />
      <Skills />
      <Certificates />
      <Education />
      <Contact />
    </>
  );
}
