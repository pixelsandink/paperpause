import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paper Pause Club — Daily Journalling Prompts',
  description:
    'A quiet corner for your thoughts. Get a fresh journalling prompt every day and make space to reflect, grow, and write.',
  openGraph: {
    title: 'Paper Pause Club',
    description: 'A quiet corner for your thoughts. Daily journalling prompts to help you reflect and grow.',
    url: 'https://paperpause.club',
    siteName: 'Paper Pause Club',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Paper Pause Club',
    description: 'Daily journalling prompts to help you reflect and grow.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
