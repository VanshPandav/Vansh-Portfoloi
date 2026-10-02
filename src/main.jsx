import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@fontsource-variable/literata/opsz.css';
import '@fontsource-variable/public-sans';
import './styles.css';
import './skills.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /><Analytics /></React.StrictMode>);
