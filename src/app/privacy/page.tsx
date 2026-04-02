export default function Privacy() {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <header className="w-full px-6 py-6 flex items-center justify-between max-w-5xl mx-auto">
        <a href="/" className="font-serif text-xl text-slate-600 tracking-tight">
          paperpause
          <span className="text-lilac-400">.</span>
          club
        </a>
        <nav className="flex items-center gap-6 text-sm font-sans text-slate-400">
          <a href="/" className="link-underline hover:text-slate-600 transition-colors">
            Home
          </a>
        </nav>
      </header>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">

        <h1 className="font-serif text-4xl text-slate-600 mb-8">
          Privacy Policy
        </h1>

        <div className="font-sans text-slate-500 leading-relaxed space-y-6 text-sm">

          <p>
            <strong className="text-slate-600">Last updated:</strong> 2 April 2026
          </p>

          <p>
            Paper Pause Club is a simple journaling prompt website. Your privacy matters
            to us, and we want to be transparent about what we do and don't collect.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">What we collect</h2>
          <p>
            <strong className="text-slate-600">Nothing.</strong> We do not collect personal
            data, email addresses, or any form of user information. There are no accounts,
            no sign-ups, and no tracking cookies.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">Cookies</h2>
          <p>
            This website does not use cookies for tracking or analytics. If cookies are
            present, they are strictly necessary for the website to function (e.g. hosting
            platform defaults) and contain no personal information.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">Analytics</h2>
          <p>
            We do not use Google Analytics or any other third-party analytics service.
            We have no interest in tracking your behaviour.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">Third parties</h2>
          <p>
            We do not share, sell, or transfer any data to third parties, because we
            don't have any data to share.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">Hosting</h2>
          <p>
            This site is hosted on Vercel. Vercel may collect standard server logs
            (IP addresses, browser type, access times) as part of normal web hosting.
            These logs are managed by Vercel under their own{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lilac-400 underline hover:text-lilac-500 transition-colors"
            >
              privacy policy
            </a>.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">Changes</h2>
          <p>
            If this policy ever changes, we'll update this page. But honestly, our
            approach is simple: we don't want your data, we just want you to write.
          </p>

          <h2 className="font-serif text-xl text-slate-600 pt-4">Contact</h2>
          <p>
            If you have any questions, you can reach us at{' '}
            <a
              href="mailto:hello@paperpause.club"
              className="text-lilac-400 underline hover:text-lilac-500 transition-colors"
            >
              hello@paperpause.club
            </a>.
          </p>

        </div>
      </main>

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
            <a href="/" className="link-underline hover:text-slate-600 transition-colors">Home</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
