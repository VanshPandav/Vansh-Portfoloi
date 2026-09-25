import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './styles.css';
import './skills.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /><Analytics /></React.StrictMode>);
