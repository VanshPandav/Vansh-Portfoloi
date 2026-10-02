import { useEffect, useRef, useState } from 'react';
import Skills from './Skills.jsx';
import ContactForm from './ContactForm.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { portfolio as data } from './content.js';

const resumeUrl = `${import.meta.env.BASE_URL}${data.resume}`;
// Links to other sites open in a new tab so visitors keep the portfolio open.
const newTab = { target: '_blank', rel: 'noopener noreferrer' };

function ResumeLink({ className, children = 'Resume' }) {
  return <a className={className} href={resumeUrl} download>{children}</a>;
}

// Each section reads like a map: its heading sits in the left-hand legend, its content to the right.
// Each legend carries a colour swatch, like a map legend.
function LegendSection({ id, title, intro, tint, className = '', children }) {
  return <section className={`section container legend-section ${className}`} id={id} aria-labelledby={`${id}-title`} style={{ '--key': `var(--tint-${tint})` }}>
    <div className="legend"><span className="legend-key" aria-hidden="true" /><h2 id={`${id}-title`}>{title}</h2>{intro && <p>{intro}</p>}</div>
    <div className="legend-body">{children}</div>
  </section>;
}

// Sections fade up as they scroll into view; content stays visible if this never runs.
function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.reveal, .legend-section');
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

function ProjectEntry({ project, featured = false }) {
  return <article className={`project reveal${featured ? ' featured' : ''}`}>
    <p className="project-category">{project.category}</p>
    <h3>{project.name}</h3>
    <p className="description">{project.description}</p>
    <div className="contribution"><h4>My contribution</h4><p>{project.contribution}</p></div>
    <p className="outcome"><strong>Outcome:</strong> {project.outcome}</p>
    <ul className="tags" aria-label="Tools used">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    {(project.caseStudy || project.links.length > 0) && <div className="project-links">
      {project.caseStudy && <a className="text-link case-study-link" href={`./${project.caseStudy}`}>Read the case study</a>}
      {project.links.map(link => <a className="text-link" key={link.url} href={link.url} {...newTab}>{link.label}</a>)}
    </div>}
  </article>;
}

function ExperienceItem({ job }) {
  return <article className="experience-row reveal">
    <p className="dates">{job.dates}</p>
    <div className="experience-body"><h3>{job.role}</h3><p className="company">{job.company}</p><p>{job.text}</p><p className="tools">{job.tools}</p>
      {job.url && <a className="text-link" href={job.url} {...newTab}>Visit website</a>}
    </div>
  </article>;
}

export default function App() {
  useReveal();
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingDialog = useRef(null);
  useEffect(() => {
    if (!bookingOpen) return;
    const dialog = bookingDialog.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [bookingOpen]);
  const openBooking = () => setBookingOpen(true);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="container header-inner">
      <a className="wordmark" href="#home" aria-label={`${data.name} home`}>{data.name}</a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#about">About</a></nav>
      <div className="header-actions"><ThemeToggle /><ResumeLink className="resume-link" /><button className="book-call" onClick={openBooking} aria-haspopup="dialog">Book a call</button></div>
    </div></header>
    <main id="main" tabIndex={-1}>
      <section className="hero" id="home">
        <div className="container hero-inner">
        <p className="hero-meta">{data.role} working across AI, backend and full stack. M.S. Computer Science, CU Boulder, 2026.</p>
        <p className="hero-greeting">Hi, I’m</p>
        {/* avoid-ai-design-ignore: SD5 (both name lines share one style; the spans only drive the rise-in animation) */}
        <h1 aria-label={data.name}>{data.name.split(' ').map((part, i) => <span className="name-line" aria-hidden="true" key={part}><span style={{ animationDelay: `${i * 0.12}s` }}>{part}</span></span>)}</h1>
        <div className="hero-foot"><p className="hero-statement">{data.introduction}</p><div><p className="hero-summary">{data.summary}</p>
          <p className="availability"><span aria-hidden="true" />{data.availability}</p>
          <div className="actions"><a className="button primary" href="#projects">See my work</a><button className="button secondary" onClick={openBooking} aria-haspopup="dialog">Book a call</button></div></div></div>
        </div>
      </section>
      <section className="container highlights reveal" aria-label="A little about me">
        <article><h3>Education</h3><p className="highlight-lead">Computer science, with a practical perspective.</p><p>M.S. Computer Science, GPA 3.7<br />University of Colorado Boulder</p></article>
        <article><h3>Capstone recognition</h3><p className="highlight-lead">2nd Place</p><p>Credible Atlas at the university capstone expo. <a className="text-link" href="#projects">Meet the project</a></p></article>
        <article><h3>My focus</h3><p className="highlight-lead">From data to useful products.</p><p>AI workflows, dependable backends, and thoughtful interfaces.</p></article>
      </section>
      <LegendSection id="projects" tint="plains" title="Ideas, built into software." intro="A closer look at the systems I’ve built, the problems they address, and what I learned.">
        {data.projects.slice(0, 3).map((project, index) => <ProjectEntry key={project.name} project={project} featured={index === 0} />)}
        <details className="more-projects"><summary>Explore more projects <span aria-hidden="true">+</span></summary>{data.projects.slice(3).map(project => <ProjectEntry key={project.name} project={project} />)}</details>
      </LegendSection>
      <LegendSection id="experience" tint="wheat" className="band-canyon" title="Built with real-world context." intro="Working with teams, stakeholders, and the constraints that shape useful software.">
        {data.experience.map(job => <ExperienceItem key={job.company} job={job} />)}
      </LegendSection>
      <Skills />
      <LegendSection id="about" tint="canyon" className="about reveal" title="Curious about systems. Focused on people.">
        <p className="about-text">{data.about}</p><h3>Education</h3>
        {data.education.map(item => <p className="education-item" key={item}>{item}</p>)}
        <ResumeLink className="text-link" />
      </LegendSection>
      <LegendSection id="contact" tint="wheat" className="contact reveal" title="Let’s build something useful." intro="Have a role, a project, or an idea in mind? I’d love to hear about it.">
        <a className="email-link" href={`mailto:${data.email}`}>{data.email}</a>
        <ContactForm />
        <div className="contact-links"><a href={data.linkedin} {...newTab}>LinkedIn</a><a href={data.github} {...newTab}>GitHub</a><ResumeLink /><button onClick={openBooking} aria-haspopup="dialog">Book a call</button></div>
      </LegendSection>
    </main>
    <dialog ref={bookingDialog} className="booking-dialog" aria-labelledby="booking-title" onClose={() => setBookingOpen(false)} onClick={event => { if (event.target === event.currentTarget) bookingDialog.current.close(); }}>
      <div className="booking-modal-content">
        <div className="booking-modal-header"><h2 id="booking-title">Book a call</h2><button className="booking-close" autoFocus onClick={() => bookingDialog.current.close()} aria-label="Close booking calendar">×</button></div>
        {bookingOpen && <iframe className="booking-calendar" src={data.booking.embedUrl} title="Book a call with Vansh Pandav — Google Calendar" />}
        <a className="booking-fallback" href={data.booking.url} {...newTab}>Open the booking page in a new tab</a>
      </div>
    </dialog>
    <footer className="container footer"><span>© {new Date().getFullYear()} {data.name}</span><a href="#home">Back to top</a></footer>
  </>;
}
