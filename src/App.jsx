import Skills from './Skills.jsx';
import { portfolio as data } from './content.js';

const resumeUrl = `${import.meta.env.BASE_URL}${data.resume}`;

function ResumeLink({ className, children = 'Download résumé ↓' }) {
  return <a className={className} href={resumeUrl} download>{children}</a>;
}

function SectionHeading({ label, title, children }) {
  return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div><p>{children}</p></div>;
}

function ProjectCard({ project, featured = false, number }) {
  return <article className={`project-card${featured ? ' featured' : ''}`}>
    <div className="project-topline"><span className="project-number">{String(number).padStart(2, '0')}</span><p className="eyebrow">{project.category}</p></div>
    <h3>{project.name}</h3>
    <p className="description">{project.description}</p>
    <div className="contribution"><h4>My contribution</h4><p>{project.contribution}</p></div>
    <ul className="tags" aria-label="Tools used">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    <p className="outcome"><strong>Outcome: </strong>{project.outcome}</p>
    {project.links.length > 0 && <div className="project-links">{project.links.map(link => <a className="text-link" key={link.url} href={link.url}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
  </article>;
}

function ExperienceItem({ job }) {
  return <article className="experience-row">
    <p className="dates">{job.dates}</p>
    <div className="experience-body"><h3>{job.role}</h3><p className="company">{job.company}</p><p>{job.text}</p><p className="tools">{job.tools}</p>
      {job.url && <a className="text-link" href={job.url}>Visit website ↗</a>}
    </div>
  </article>;
}

export default function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="container header-inner">
      <a className="wordmark" href="#home" aria-label={`${data.name} home`}>VP<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#skills">Skills</a></nav>
      <ResumeLink className="resume-link">Résumé <span aria-hidden="true">↓</span></ResumeLink>
    </div></header>
    <main id="main" tabIndex={-1}>
      <section className="hero container" id="home">
        <p className="eyebrow">{data.role} · AI, backend & full stack</p><h1><span className="hero-greeting">Hi, I’m</span><span className="hero-name">{data.name}<span className="name-dot">.</span></span></h1><p className="hero-statement">{data.introduction}</p><p className="hero-summary">{data.summary}</p>
        
        <div className="quick-links" aria-label="Explore portfolio"><a href="#projects">↗ My work</a><a href="#about">About me</a><a href="#skills">Skills</a><a href="#contact">Say hello</a></div><a className="scroll-cue" href="#projects">Scroll to explore <span aria-hidden="true">↓</span></a>
      </section>
      <div className="container identity-strip" aria-hidden="true"><span>{data.name}</span><span>{data.role}</span></div><section className="container highlights" aria-label="A little about me"><article><p className="eyebrow">EDUCATION</p><h2>Computer science.<br />A practical perspective.</h2><p>M.S. Computer Science<br />University of Colorado Boulder</p></article><article><p className="eyebrow">CAPSTONE RECOGNITION</p><h2>2nd Place</h2><p>Credible Atlas · University capstone expo</p><a className="text-link" href="#projects">Meet the project ↗</a></article><article><p className="eyebrow">MY FOCUS</p><h2>From data<br />to useful products.</h2><p>AI workflows, dependable backends, and thoughtful interfaces.</p></article></section><section className="section container" id="projects">
        <SectionHeading label="01 / SELECTED WORK" title="Ideas, built into software.">A closer look at the systems I’ve built, the problems they address, and what I learned.</SectionHeading>
        <div className="projects">{data.projects.slice(0, 3).map((project, index) => <ProjectCard key={project.name} project={project} featured={index === 0} number={index + 1} />)}</div>
        <details className="more-projects"><summary>Explore more projects <span aria-hidden="true">+</span></summary><div className="projects">{data.projects.slice(3).map((project, index) => <ProjectCard key={project.name} project={project} number={index + 4} />)}</div></details>
      </section>
      <section className="experience-section" id="experience"><div className="section container">
        <SectionHeading label="02 / EXPERIENCE" title="Built with real-world context.">Working with teams, stakeholders, and the constraints that shape useful software.</SectionHeading>
        {data.experience.map(job => <ExperienceItem key={job.company} job={job} />)}
      </div></section>
      <section className="section container about-grid" id="about"><div>
        <p className="eyebrow">03 / ABOUT ME</p><h2>Curious about systems.<br />Focused on people.</h2><p className="about-text">{data.about}</p><h3>Education</h3>
        {data.education.map(item => <p className="education-item" key={item}>{item}</p>)}
        <ResumeLink className="text-link">Download my résumé ↓</ResumeLink>
      </div></section>
      <Skills />
      <section className="container contact" id="contact">
        <p className="eyebrow">05 / LET’S CONNECT</p><h2>Let’s build something useful.</h2><p>Have a role, a project, or an idea in mind? I’d love to hear about it.</p>
        <a className="email-link" href={`mailto:${data.email}`}>{data.email}</a>
        <div className="contact-links"><a href={data.linkedin}>LinkedIn ↗</a><a href={data.github}>GitHub ↗</a><ResumeLink /></div>
      </section>
    </main>
    <footer className="container footer"><span>© {new Date().getFullYear()} {data.name}</span><a href="#home">Back to top ↑</a></footer>
  </>;
}
