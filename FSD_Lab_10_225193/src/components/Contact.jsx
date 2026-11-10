import { useState } from 'react'
import { profile } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Button from './Button'
import { Check, Copy, Github, Linkedin, Mail } from './Icons'
import './Contact.css'

const initial = { name: '', email: '', subject: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell me your name.'
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) next.message = 'A few more words, please (10+ characters).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Opens the visitor's email app with the message pre-filled,
  // addressed to Hamza. No backend is needed.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const subject = form.subject.trim() || `Portfolio enquiry from ${form.name}`
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setForm(initial)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      // Fallback for browsers without the Clipboard API
      const t = document.createElement('textarea')
      t.value = profile.email
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__panel">
          <div className="contact__glow" aria-hidden="true" />

          <div className="contact__intro">
            <SectionHeading index="05" label="Contact" title="Let’s build" accent="something together.">
              Have a project, an internship opening or just a question? My inbox is always open —
              I usually reply within a day.
            </SectionHeading>

            <Reveal className="contact__email" delay={80}>
              <a href={`mailto:${profile.email}`} className="contact__email-link">
                <Mail /> {profile.email}
              </a>
              <button
                type="button"
                className={`copy-btn ${copied ? 'is-copied' : ''}`}
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? <Check /> : <Copy />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </Reveal>

            <Reveal className="contact__socials" delay={140}>
              <a href={profile.socials[0].href} target="_blank" rel="noreferrer"><Github /> GitHub</a>
              <a href={profile.socials[1].href} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
            </Reveal>
          </div>

          <Reveal as="form" className="contact__form" onSubmit={handleSubmit} noValidate delay={120}>
            {sent ? (
              <div className="contact__sent">
                <span className="contact__sent-icon"><Check width={26} height={26} /></span>
                <h3>Your email app is opening.</h3>
                <p>Thanks for reaching out — just press send and I’ll get back to you soon.</p>
                <Button type="button" variant="ghost" onClick={() => setSent(false)}>
                  Write another
                </Button>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" />
                  <Field label="Email address" name="email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" />
                </div>
                <Field label="Subject (optional)" name="subject" value={form.subject} onChange={update} />
                <Field label="Message" name="message" textarea value={form.message} onChange={update} error={errors.message} />
                <Button type="submit" className="contact__submit">Send message</Button>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Reusable floating-label input field.
function Field({ label, name, textarea, error, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <Tag name={name} placeholder=" " rows={textarea ? 5 : undefined} aria-invalid={!!error} {...props} />
      <span className="field__label">{label}</span>
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}
