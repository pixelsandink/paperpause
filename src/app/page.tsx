import { getDailyPrompt } from '@/lib/prompts'
import PromptCard from '@/components/PromptCard'
import MonthlySchedule from '@/components/MonthlySchedule'

export const revalidate = 3600 // Revalidate every hour

export default function Home() {
  const dailyPrompt = getDailyPrompt()

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <header className="w-full px-6 py-6 flex items-center justify-between max-w-5xl mx-auto fade-up">
        <a href="/" className="font-serif text-xl text-slate-600 tracking-tight">
          paperpause
          <span className="text-lilac-400">.</span>
          club
        </a>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center pt-8 pb-16 px-6 max-w-3xl mx-auto w-full">

        {/* Date label */}
        <p className="font-sans text-sm text-slate-400 mb-4 tracking-wide fade-up fade-up-delay-1">
          {today}
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-5xl text-slate-600 text-center leading-tight mb-3 fade-up fade-up-delay-1">
          Today's prompt
        </h1>

        <p className="font-sans text-base text-slate-500 text-center mb-10 fade-up fade-up-delay-2">
          Take a breath. Open your journal. Begin.
        </p>

        {/* Prompt card + controls */}
        <div className="w-full fade-up fade-up-delay-3">
          <PromptCard initialPrompt={dailyPrompt} />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-2xl my-16 fade-up fade-up-delay-4">
          <div className="flex-1 h-px bg-lilac-200" />
          <span className="text-lilac-300 text-lg select-none">✦</span>
          <div className="flex-1 h-px bg-lilac-200" />
        </div>

        {/* Monthly schedule generator */}
        <div className="w-full fade-up fade-up-delay-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-slate-600 mb-3">
              Themed monthly prompts
            </h2>
            <p className="font-sans text-slate-500 text-base">
              A full month of prompts around a theme you choose — delivered to your inbox.
            </p>
          </div>
          <MonthlySchedule />
        </div>

      </main>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="w-full bg-cream-200 border-t border-lilac-200 py-20 px-6"
      >
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-lilac-400 text-3xl mb-6 block select-none">☽</span>
          <h2 className="font-serif text-3xl text-slate-600 mb-5">
            A quiet corner for your thoughts
          </h2>
          <p className="font-sans text-slate-500 leading-relaxed mb-5">
            Paper Pause Club is a place to slow down, pick up your pen, and write.
            Every day brings a fresh prompt — sometimes reflective, sometimes playful,
            always an invitation to meet yourself on the page.
          </p>
          <p className="font-sans text-slate-500 leading-relaxed">
            Whether you've journalled for years or you're just starting, there's no
            right way to do this. Just pause. Just write.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {[
              { icon: '✦', title: 'Daily', body: 'A new prompt every day, thoughtfully chosen to meet you where you are.' },
              { icon: '◎', title: 'Gentle', body: 'No pressure, no performance. This is writing for you, not for anyone else.' },
              { icon: '❧', title: 'Growing', body: 'Workshops, journals, and community — all coming soon for those who want more.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <span className="text-lilac-400 text-xl select-none">{icon}</span>
                <h3 className="font-serif text-lg text-slate-600">{title}</h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-lilac-200 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-slate-400 text-sm">
            paperpause<span className="text-lilac-400">.</span>club
          </p>
          <p className="font-sans text-xs text-slate-500">
            © {new Date().getFullYear()} Paper Pause Club · Made with care
          </p>
          <div className="flex gap-4 text-xs font-sans text-slate-500">
            <a href="/privacy" className="link-underline hover:text-slate-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
