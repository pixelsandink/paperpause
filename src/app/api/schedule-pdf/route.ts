import { NextRequest, NextResponse } from 'next/server'
import { generatePromptPDF } from '@/lib/generate-pdf'
import { themes } from '@/lib/themed-prompts'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * GET /api/schedule-pdf?theme=reflection&month=April&year=2026
 * Returns a PDF of the prompt schedule.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const themeId = searchParams.get('theme') || 'reflection'
    const monthName = searchParams.get('month') || 'April'
    const year = parseInt(searchParams.get('year') || '2026', 10)

    const theme = themes.find((t) => t.id === themeId)
    if (!theme) {
      return NextResponse.json({ error: 'Invalid theme' }, { status: 400 })
    }

    const monthIndex = monthNames.indexOf(monthName)
    if (monthIndex === -1) {
      return NextResponse.json({ error: 'Invalid month' }, { status: 400 })
    }

    const pdfBuffer = await generatePromptPDF(themeId, monthIndex, year)

    const filename = `PaperPause-${theme.label.replace(/\s+/g, '-')}-${monthName}-${year}.pdf`

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
