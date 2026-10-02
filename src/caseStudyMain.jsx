import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { createRoot } from 'react-dom/client';
import CaseStudy from './CaseStudy.jsx';
import { caseStudies } from './caseStudies.js';
import '@fontsource-variable/literata/opsz.css';
import '@fontsource-variable/public-sans';
import './styles.css';
import './caseStudy.css';

// Each case study page names its content with <div id="root" data-study="slug">.
const root = document.getElementById('root');
createRoot(root).render(<React.StrictMode><CaseStudy study={caseStudies[root.dataset.study]} /><Analytics /></React.StrictMode>);
