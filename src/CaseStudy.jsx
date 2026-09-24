import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { portfolio as data } from './content.js';

const asset = path => `${import.meta.env.BASE_URL}${path}`;
const newTab = { target: '_blank', rel: 'noopener noreferrer' };
const hasContent = section => ['body', 'list', 'steps', 'cards'].some(key => section[key]?.length) || section.image;

// A silent looping demo video, or an image. With reduced motion the video waits for the visitor to press play.
function Cover({ cover }) {
  const [still] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (!cover.video) return <img className="cs-cover" src={asset(cover.src)} alt={cover.alt} />;
  return <figure className="cs-cover cs-video">
    <video src={asset(cover.video)} poster={cover.poster ? asset(cover.poster) : undefined} autoPlay={!still} muted loop playsInline controls={still} preload="metadata" aria-label={cover.alt} />
    {cover.caption && <figcaption>{cover.caption}</figcaption>}
  </figure>;
}

function Section({ section, number }) {
  return <section className="cs-section" id={section.id} aria-labelledby={`${section.id}-title`}>
    <p className="cs-section-number">{String(number).padStart(2, '0')}</p>
    <div>
      <h2 id={`${section.id}-title`}>{section.title}</h2>
      {section.image && <figure className="cs-figure"><img src={asset(section.image.src)} alt={section.image.alt} loading="lazy" />{section.caption && <figcaption>{section.caption}</figcaption>}</figure>}
      {section.body?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {section.list?.length > 0 && <ul className="cs-list">{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
      {section.steps?.length > 0 && <ol className="cs-steps">{section.steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>}
      {section.cards?.length > 0 && <div className="cs-cards">{section.cards.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>}
    </div>
  </section>;
}

export default function CaseStudy({ study }) {
  useEffect(() => { document.title = `${study.name} case study | ${data.name}`; }, [study]);
  const sections = study.sections.filter(hasContent);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="container header-inner">
      <a className="wordmark" href="./index.html" aria-label={`${data.name} home`}>VP<span>.</span></a>
      <nav aria-label="Case study sections">{sections.slice(0, 5).map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
      <div className="header-actions"><ThemeToggle /><a className="resume-link" href="./index.html#projects">← All work</a></div>
    </div></header>
    <main id="main" tabIndex={-1} className="case-study">
      <section className="container cs-hero">
        <div className="hero-meta"><p className="eyebrow">Case study · {study.category}</p>{study.award && <p className="cs-award">★ {study.award}</p>}</div>
        <h1>{study.name}<span className="name-dot">.</span></h1>
        <p className="cs-tagline">{study.tagline}</p>
        <dl className="cs-facts">{study.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        {study.cover && <Cover cover={study.cover} />}
      </section>
      <div className="container cs-body">{sections.map((section, i) => <Section key={section.id} section={section} number={i + 1} />)}</div>
      {study.links.length > 0 && <section className="container cs-links"><p className="eyebrow">See it for yourself</p><div className="actions">{study.links.map((link, i) => <a key={link.url} className={`button ${i ? 'secondary' : 'primary'}`} href={link.url} {...newTab}>{link.label} <span aria-hidden="true">↗</span></a>)}</div></section>}
    </main>
    <footer className="container footer"><span>© {new Date().getFullYear()} {data.name}</span><a href="./index.html#projects">← Back to all projects</a></footer>
  </>;
}
