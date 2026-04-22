'use client'

import { useState } from 'react'
import { themes } from '@/lib/themed-prompts'

export default function MonthlySchedule() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interest: 'monthly-schedule' }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ── Theme preview grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 opacity-60 pointer-events-none select-none">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="flex flex-col items-center gap-2 rounded-xl border border-lilac-200 bg-cream-50 px-4 py-5 text-center"
          >
            <span className="text-2xl">{theme.icon}</span>
            <span className="font-serif text-sm text-slate-600">{theme.label}</span>
            <span className="font-sans text-xs text-slate-400 leading-snug">{theme.description}</span>
          </div>
        ))}
      </div>

      {/* ── Coming soon badge + register interest ── */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <span className="inline-block rounded-full bg-lilac-100 px-4 py-1.5 text-xs font-sans font-medium text-lilac-500 tracking-wide uppercase">
          Coming soon
        </span>

        <p className="font-sans text-slate-500 text-sm text-center max-w-md">
          Pick a theme, get a beautifully designed month of prompts sent straight to your inbox.
          Register your interest and we&apos;ll let you know when it&apos;s ready.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center gap-3 mt-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-lilac-200 bg-cream-50 px-5 py-3.5
                         font-sans text-sm text-slate-600 placeholder:text-slate-300
                         focus:outline-none focus:border-lilac-400 focus:ring-1 focus:ring-lilac-200
                         transition-all duration-200"
            />

            {error && (
              <p className="text-xs text-red-400 font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-lilac-400 px-6 py-3.5 text-sm font-sans text-white
                         transition-all duration-200 hover:bg-lilac-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Register your interest'}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2 fade-up mt-2">
            <span className="text-2xl select-none">✓</span>
            <p className="font-sans text-slate-500 text-sm text-center">
              You&apos;re on the list! We&apos;ll email you when themed schedules launch.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
