import { useEffect, useState } from 'react';

const colors = { light: '#f3eee4', dark: '#141312' };

// index.html sets data-theme before the page paints; this keeps it in sync afterwards.
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[theme]);
  document.dispatchEvent(new Event('themechange'));
}

function storedTheme() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)');
    const follow = () => { if (!storedTheme()) { const next = system.matches ? 'dark' : 'light'; applyTheme(next); setTheme(next); } };
    system.addEventListener('change', follow);
    return () => system.removeEventListener('change', follow);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch { /* the choice just won't be remembered */ }
    applyTheme(next);
    setTheme(next);
  }

  const dark = theme === 'dark';
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'}>
    {dark
      ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
      : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5a8.5 8.5 0 1 0 10.9 10.9Z" /></svg>}
  </button>;
}
