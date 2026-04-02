import { NextRequest, NextResponse } from 'next/server'
import { generateMonthlySchedule, themes } from '@/lib/themed-prompts'

/**
 * Monthly prompt schedule request endpoint.
 *
 * Accepts: { email, theme, month, year }
 * - Validates the request
 * - Generates the prompt schedule
 * - Logs the request (placeholder until email service is connected)
 *
 * TO CONNECT YOUR EMAIL SERVICE:
 *
 * Option A — Resend (recommended, free tier = 100 emails/day):
 *   - npm install resend
 *   - Add RESEND_API_KEY to .env.local
 *   - Uncomment the Resend section below
 *
 * Option B — Mailchimp Transactional (Mandrill):
 *   - Add MANDRILL_API_KEY to .env.local
 *
 * Option C — ConvertKit / Kit:
 *   - Add CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID to .env.local
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

    const themeData = themes.find(t => t.id === theme)
    if (!themeData) {
      return NextResponse.json(
        { error: 'Invalid theme selected.' },
        { status: 400 }
      )
    }

    // Resolve month index from name (the client sends the name string)
    const monthIndex = monthNames.indexOf(month)
    if (monthIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid month.' },
        { status: 400 }
      )
    }

    // ── Generate the schedule ───────────────────────────────────────
    const schedule = generateMonthlySchedule(theme, monthIndex, year)

    // ── RESEND (recommended) ────────────────────────────────────────
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // const promptListHtml = schedule
    //   .map(({ day, prompt }) =>
    //     `<tr>
    //        <td style="padding:6px 12px 6px 0;font-family:'Playfair Display',Georgia,serif;font-weight:600;color:#334155;vertical-align:top;width:30px;">${day}.</td>
    //        <td style="padding:6px 0;font-family:'DM Sans',system-ui,sans-serif;font-size:14px;color:#334155;line-height:1.5;">${prompt}</td>
    //      </tr>`
    //   )
    //   .join('')
    //
    // await resend.emails.send({
    //   from: 'Paper Pause Club <hello@paperpause.club>',
    //   to: email,
    //   subject: `Your ${themeData.label} prompts for ${month} ${year} ✦`,
    //   html: `
    //     <div style="max-width:600px;margin:0 auto;font-family:'DM Sans',system-ui,sans-serif;color:#334155;padding:32px 24px;">
    //       <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:700;text-align:center;margin:0 0 4px 0;">
    //         ${month} ${year}
    //       </h1>
    //       <p style="text-align:center;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 24px 0;">
    //         ${themeData.icon} ${themeData.label}
    //       </p>
    //       <table style="width:100%;border-collapse:collapse;">
    //         ${promptListHtml}
    //       </table>
    //       <p style="text-align:center;font-size:11px;color:#cbd5e1;margin-top:24px;font-family:'Playfair Display',Georgia,serif;">
    //         paperpause<span style="color:#A088CE;">.</span>club
    //       </p>
    //     </div>
    //   `,
    // })
    // ─────────────────────────────────────────────────────────────────

    // Placeholder: log the request until an email service is connected
    console.log(
      `📝 Schedule request: ${email} → ${themeData.label} / ${month} ${year} (${schedule.length} prompts)`
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
