import React from 'react';
import { createRoot } from 'react-dom/client';
import CaseStudy from './CaseStudy.jsx';
import { caseStudies } from './caseStudies.js';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './styles.css';
import './caseStudy.css';

// Each case study page names its content with <div id="root" data-study="slug">.
const root = document.getElementById('root');
createRoot(root).render(<React.StrictMode><CaseStudy study={caseStudies[root.dataset.study]} /></React.StrictMode>);
