import { useEffect } from 'react';
import Skills from './Skills.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { portfolio as data } from './content.js';

const resumeUrl = `${import.meta.env.BASE_URL}${data.resume}`;
// Links to other sites open in a new tab so visitors keep the portfolio open.
const newTab = { target: '_blank', rel: 'noopener noreferrer' };

function ResumeLink({ className, children = 'Resume' }) {
  return <a className={className} href={resumeUrl} download>{children}</a>;
}

function SectionHeading({ label, title, children }) {
  return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div><p>{children}</p></div>;
}

// Sections fade up as they scroll into view; content stays visible if this never runs.
function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.reveal');
    document.documentElement.classList.add('can-reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function ProjectCard({ project, featured = false, number }) {
  return <article className={`project-card reveal${featured ? ' featured' : ''}`}>
    <div className="project-content">
    <div className="project-topline"><span className="project-number">{String(number).padStart(2, '0')}</span><p className="eyebrow">{project.category}</p></div>
    <h3>{project.name}</h3>
    <p className="description">{project.description}</p>
    <div className="contribution"><h4>My contribution</h4><p>{project.contribution}</p></div>
    <ul className="tags" aria-label="Tools used">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    <p className="outcome"><strong>Outcome: </strong>{project.outcome}</p>
    {(project.caseStudy || project.links.length > 0) && <div className="project-links">
      {project.caseStudy && <a className="text-link case-study-link" href={`./${project.caseStudy}`}>Read the case study <span aria-hidden="true">→</span></a>}
      {project.links.map(link => <a className="text-link" key={link.url} href={link.url} {...newTab}>{link.label} <span aria-hidden="true">↗</span></a>)}
    </div>}
    </div>
  </article>;
}

function ExperienceItem({ job }) {
  return <article className="experience-row reveal">
    <p className="dates">{job.dates}</p>
    <div className="experience-body"><h3>{job.role}</h3><p className="company">{job.company}</p><p>{job.text}</p><p className="tools">{job.tools}</p>
      {job.url && <a className="text-link" href={job.url} {...newTab}>Visit website ↗</a>}
    </div>
  </article>;
}

export default function App() {
  useReveal();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="container header-inner">
      <a className="wordmark" href="#home" aria-label={`${data.name} home`}>VP<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#about">About</a></nav>
      <div className="header-actions"><ThemeToggle /><ResumeLink className="resume-link" /></div>
    </div></header>
    <main id="main" tabIndex={-1}>
      <section className="hero container" id="home">
        <div className="hero-meta"><p className="eyebrow">{data.role} — AI, backend & full stack</p><p className="hero-note">M.S. CS · CU Boulder ’26</p></div>
        <h1><span className="hero-greeting">Hi, I’m</span><span className="hero-name">{data.name.split(' ')[0]} <em>{data.name.split(' ').slice(1).join(' ')}</em><span className="name-dot">.</span></span></h1>
        <div className="hero-foot"><p className="hero-statement">{data.introduction}</p><div><p className="hero-summary">{data.summary}</p>
          <p className="availability"><span aria-hidden="true" />{data.availability}</p>
          <div className="actions"><a className="button primary" href="#projects">See my work <span aria-hidden="true">↗</span></a><a className="button secondary" href="#contact">Say hello</a></div></div></div>
      </section>
      <section className="container highlights reveal" aria-label="A little about me"><article><p className="eyebrow">EDUCATION</p><h2>Computer science.<br />A practical perspective.</h2><p>M.S. Computer Science · GPA 3.7<br />University of Colorado Boulder</p></article><article><p className="eyebrow">CAPSTONE RECOGNITION</p><h2>2nd Place</h2><p>Credible Atlas · University capstone expo</p><a className="text-link" href="#projects">Meet the project ↗</a></article><article><p className="eyebrow">MY FOCUS</p><h2>From data<br />to useful products.</h2><p>AI workflows, dependable backends, and thoughtful interfaces.</p></article></section><section className="section container" id="projects">
        <SectionHeading label="01 / SELECTED WORK" title={<>Ideas, built into <em>software.</em></>}>A closer look at the systems I’ve built, the problems they address, and what I learned.</SectionHeading>
        <div className="projects">{data.projects.slice(0, 3).map((project, index) => <ProjectCard key={project.name} project={project} featured={index === 0} number={index + 1} />)}</div>
        <details className="more-projects"><summary>Explore more projects <span aria-hidden="true">+</span></summary><div className="projects">{data.projects.slice(3).map((project, index) => <ProjectCard key={project.name} project={project} number={index + 4} />)}</div></details>
      </section>
      <section className="experience-section" id="experience"><div className="section container">
        <SectionHeading label="02 / EXPERIENCE" title={<>Built with <em>real-world</em> context.</>}>Working with teams, stakeholders, and the constraints that shape useful software.</SectionHeading>
        {data.experience.map(job => <ExperienceItem key={job.company} job={job} />)}
      </div></section>
      <Skills />
      <section className="section container about-grid reveal" id="about"><div>
        <p className="eyebrow">04 / ABOUT ME</p><h2>Curious about systems.<br /><em>Focused on people.</em></h2><p className="about-text">{data.about}</p><h3>Education</h3>
        {data.education.map(item => <p className="education-item" key={item}>{item}</p>)}
        <ResumeLink className="text-link" />
      </div></section>
      <section className="container contact reveal" id="contact">
        <p className="eyebrow">05 / LET’S CONNECT</p><h2>Let’s build something <em>useful.</em></h2><p>Have a role, a project, or an idea in mind? I’d love to hear about it.</p>
        <a className="email-link" href={`mailto:${data.email}`}>{data.email}</a>
        <div className="contact-links"><a href={data.linkedin} {...newTab}>LinkedIn ↗</a><a href={data.github} {...newTab}>GitHub ↗</a><ResumeLink /></div>
      </section>
    </main>
    <footer className="container footer"><span>© {new Date().getFullYear()} {data.name}</span><a href="#home">Back to top ↑</a></footer>
  </>;
}
