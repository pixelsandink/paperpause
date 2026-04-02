'use client'

import { useState, useCallback } from 'react'

interface PromptCardProps {
  initialPrompt: string
}

export default function PromptCard({ initialPrompt }: PromptCardProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [isLoading, setIsLoading] = useState(false)
  const [useAI, setUseAI] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)

  const generateNewPrompt = useCallback(async () => {
    setIsLoading(true)

    // After 3 database prompts, offer AI generation
    const shouldUseAI = useAI || generationCount >= 3

    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPrompt: prompt, useAI: shouldUseAI }),
      })
      const data = await res.json()
      setPrompt(data.prompt)
      setGenerationCount(prev => prev + 1)
    } catch {
      // Silent fail — keep current prompt
    } finally {
      setIsLoading(false)
    }
  }, [prompt, useAI, generationCount])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Prompt card */}
      <div
        className={`
          relative w-full max-w-2xl rounded-2xl border border-lilac-200
          bg-cream-50 px-8 py-10 shadow-sm
          transition-opacity duration-300
          ${isLoading ? 'opacity-50' : 'opacity-100'}
        `}
      >
        {/* Decorative corner marks */}
        <span className="absolute left-4 top-4 text-lilac-200 select-none text-lg">"</span>
        <span className="absolute bottom-4 right-4 text-lilac-200 select-none text-lg">"</span>

        <p className="font-serif text-xl leading-relaxed text-slate-600 text-center md:text-2xl">
          {isLoading ? (
            <span className="text-slate-300 italic">Finding your next prompt…</span>
          ) : (
            prompt
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={generateNewPrompt}
          disabled={isLoading}
          className="
            group flex items-center gap-2 rounded-full border border-lilac-300
            bg-white px-6 py-3 text-sm font-sans text-lilac-500
            transition-all duration-200 hover:bg-lilac-400 hover:text-white
            hover:border-lilac-400 disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Give me a different prompt
        </button>

        {generationCount >= 3 && !useAI && (
          <button
            onClick={() => { setUseAI(true); generateNewPrompt() }}
            className="text-xs text-stone-warm underline underline-offset-2 hover:text-bark-400 transition-colors"
          >
            Try an AI-generated prompt instead
          </button>
        )}
      </div>

      {/* Subtle daily note */}
      <p className="text-xs text-slate-400 font-sans text-center">
        Today's prompt refreshes at midnight · Come back tomorrow for a new one
      </p>
    </div>
  )
}
