'use client'

import { useState } from 'react'
import { themes } from '@/lib/themed-prompts'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

type Step = 'theme' | 'month' | 'email' | 'done'

export default function MonthlySchedule() {
  const now = new Date()
  const [step, setStep] = useState<Step>('theme')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectedThemeData = themes.find(t => t.id === selectedTheme)

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    setStep('month')
  }

  const handleMonthConfirm = () => {
    setStep('email')
  }

  const goToPrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else { setMonth(m => m - 1) }
  }

  const goToNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else { setMonth(m => m + 1) }
  }

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
        body: JSON.stringify({
          email,
          theme: selectedTheme,
          month: monthNames[month],
          year,
        }),
      })

      if (res.ok) {
        setStep('done')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStartOver = () => {
    setStep('theme')
    setSelectedTheme(null)
    setEmail('')
    setError('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ── Step 1: Pick a theme ── */}
      {step === 'theme' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className="flex flex-col items-center gap-2 rounded-xl border border-lilac-200 bg-cream-50 px-4 py-5 transition-all duration-200 text-center hover:border-lilac-400 hover:bg-lilac-50 hover:shadow-sm"
            >
              <span className="text-2xl select-none">{theme.icon}</span>
              <span className="font-serif text-sm text-slate-600">{theme.label}</span>
              <span className="font-sans text-xs text-slate-400 leading-snug">{theme.description}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Step 2: Pick a month ── */}
      {step === 'month' && selectedThemeData && (
        <div className="flex flex-col items-center gap-6 fade-up">
          <div className="flex items-center gap-2 text-sm font-sans text-lilac-400">
            <span className="text-lg">{selectedThemeData.icon}</span>
            <span>{selectedThemeData.label}</span>
            <button
              onClick={() => setStep('theme')}
              className="ml-2 text-xs text-slate-400 underline underline-offset-2 hover:text-slate-500"
            >
              change
            </button>
          </div>

          <p className="font-sans text-slate-500 text-sm">Which month would you like prompts for?</p>

          <div className="flex items-center gap-6">
            <button onClick={goToPrevMonth} className="text-slate-300 hover:text-lilac-400 transition-colors text-2xl">&larr;</button>
            <span className="font-serif text-2xl text-slate-600 min-w-[220px] text-center">
              {monthNames[month]} {year}
            </span>
            <button onClick={goToNextMonth} className="text-slate-300 hover:text-lilac-400 transition-colors text-2xl">&rarr;</button>
          </div>

          <button
            onClick={handleMonthConfirm}
            className="rounded-full border border-lilac-300 bg-white px-8 py-3 text-sm font-sans text-lilac-500 transition-all duration-200 hover:bg-lilac-400 hover:text-white hover:border-lilac-400"
          >
            Next
          </button>
        </div>
      )}

      {/* ── Step 3: Email capture ── */}
      {step === 'email' && selectedThemeData && (
        <div className="flex flex-col items-center gap-6 fade-up">
          <div className="flex items-center gap-2 text-sm font-sans text-lilac-400">
            <span className="text-lg">{selectedThemeData.icon}</span>
            <span>{selectedThemeData.label}</span>
            <span className="text-slate-300 mx-1">·</span>
            <span className="text-slate-400">{monthNames[month]} {year}</span>
          </div>

          <div className="text-center">
            <p className="font-sans text-slate-600 mb-1">
              We&apos;ll send your prompt schedule straight to your inbox.
            </p>
            <p className="font-sans text-xs text-slate-400">
              A beautifully designed PDF, ready to print and stick in your journal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center gap-3">
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
              {isSubmitting ? 'Sending...' : 'Send me my prompts'}
            </button>

            <p className="text-xs text-slate-400 font-sans text-center">
              No spam, ever. Just your prompts.
            </p>
          </form>

          <button
            onClick={() => setStep('month')}
            className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-500 transition-colors"
          >
            Go back
          </button>
        </div>
      )}

      {/* ── Step 4: Confirmation ── */}
      {step === 'done' && selectedThemeData && (
        <div className="flex flex-col items-center gap-5 fade-up text-center">
          <span className="text-4xl select-none">✉</span>
          <h3 className="font-serif text-2xl text-slate-600">
            Check your inbox
          </h3>
          <p className="font-sans text-slate-500 text-sm max-w-sm">
            Your <strong>{selectedThemeData.label}</strong> prompts for <strong>{monthNames[month]} {year}</strong> are
            on their way. Print it out, stick it in your journal, and enjoy.
          </p>
          <button
            onClick={handleStartOver}
            className="rounded-full border border-lilac-300 bg-white px-6 py-2.5 text-sm font-sans text-lilac-500 transition-all duration-200 hover:bg-lilac-400 hover:text-white hover:border-lilac-400 mt-2"
          >
            Generate another month
          </button>
        </div>
      )}
    </div>
  )
}
