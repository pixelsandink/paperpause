import { NextRequest, NextResponse } from 'next/server'
import { themes } from '@/lib/themed-prompts'
import { generatePromptPDF } from '@/lib/generate-pdf'

/**
 * Monthly prompt schedule request endpoint.
 *
 * Accepts: { email, theme, month, year }
 * - Validates the request
 * - Generates a branded PDF of the prompt schedule
 * - Emails it as an attachment via Resend
 *
 * SETUP:
 *   1. npm install resend
 *   2. Add RESEND_API_KEY to .env.local (and Vercel env vars)
 *   3. Verify paperpause.club domain in Resend dashboard
 *   4. Uncomment the Resend block below
 */

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export async function POST(request: NextRequest) {
  try {
    const { email, theme, month, year } = await request.json()

    // ── Validation ──────────────────────────────────────────────────
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const themeData = themes.find((t) => t.id === theme)
    if (!themeData) {
      return NextResponse.json(
        { error: 'Invalid theme selected.' },
        { status: 400 }
      )
    }

    const monthIndex = monthNames.indexOf(month)
    if (monthIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid month.' },
        { status: 400 }
      )
    }

    // ── Generate the PDF ────────────────────────────────────────────
    const pdfBuffer = await generatePromptPDF(theme, monthIndex, year)
    const filename = `PaperPause-${themeData.label.replace(/\s+/g, '-')}-${month}-${year}.pdf`

    // ── RESEND — uncomment when ready ───────────────────────────────
    // import { Resend } from 'resend'  // move to top of file
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'Paper Pause Club <hello@paperpause.club>',
    //   to: email,
    //   subject: `Your ${themeData.label} prompts for ${month} ${year}`,
    //   html: `
    //     <div style="max-width:520px;margin:0 auto;font-family:Georgia,serif;color:#334155;padding:40px 24px;text-align:center;">
    //       <h1 style="font-size:24px;font-weight:700;margin:0 0 4px;">
    //         ${month} ${year}
    //       </h1>
    //       <p style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 24px;">
    //         ${themeData.icon} ${themeData.label}
    //       </p>
    //       <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#334155;">
    //         Your prompt schedule is attached as a PDF.<br/>
    //         Print it, stick it in your journal, and write every day.
    //       </p>
    //       <p style="font-size:11px;color:#cbd5e1;margin-top:32px;">
    //         paperpause<span style="color:#A088CE;">.</span>club
    //       </p>
    //     </div>
    //   `,
    //   attachments: [
    //     {
    //       filename,
    //       content: pdfBuffer,
    //     },
    //   ],
    // })
    // ─────────────────────────────────────────────────────────────────

    // Placeholder: log until Resend is connected
    console.log(
      `📝 Schedule request: ${email} → ${themeData.label} / ${month} ${year} (PDF: ${(pdfBuffer.length / 1024).toFixed(1)}KB)`
    )

    return NextResponse.json({
      success: true,
      message: `Your ${themeData.label} prompts for ${month} ${year} are on their way!`,
    })
  } catch (error) {
    console.error('Schedule request error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
