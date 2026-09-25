import { useRef, useState } from 'react';
import { portfolio as data } from './content.js';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const submitting = useRef(false);
  const endpoint = data.contactFormEndpoint;

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (!endpoint) return;
    submitting.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, { method: 'POST', body: values, headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return <form className="contact-form" onSubmit={submit} aria-labelledby="contact-form-title">
    <h3 id="contact-form-title">Send me a message.</h3>
    <div className="contact-form-row">
      <label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={120} /></label>
      <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
    </div>
    <label htmlFor="contact-subject">Subject <span>(optional)</span><input id="contact-subject" name="subject" placeholder="What would you like to discuss?" maxLength={200} /></label>
    <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" placeholder="Tell me a little about the opportunity or idea…" rows={4} required maxLength={5000} /></label>
    <div className="contact-form-actions"><button type="submit" disabled={!endpoint || status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message ↗'}</button>{!endpoint && <p>Please use my email link above for now.</p>}</div>
    <p className="contact-form-status" role="status" aria-live="polite">{status === 'success' ? 'Thanks! Your message has been submitted.' : status === 'error' ? 'We couldn’t confirm submission. Your message is still here—try again or email me directly.' : ''}</p>
  </form>;
}
