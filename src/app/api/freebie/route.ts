import { NextResponse } from 'next/server'
import { generateFreePromptPDF } from '@/lib/generate-pdf'

const mayPrompts = [
  "What would you do differently if you knew no one was watching?",
  "Describe a small moment from this week that deserves more attention.",
  "If your life were a novel, what chapter are you in right now?",
  "What has been your greatest teacher this year?",
  "Write about someone who has shaped who you are without knowing it.",
  "What does home mean to you right now?",
  "When did you last feel truly at peace? What were the conditions?",
  "Write about a place you've never been but feel drawn to.",
  "What does courage look like in your daily life?",
  "What are you most afraid of losing?",
  "Describe the last time you were completely present in a moment.",
  "What sounds, smells, or textures instantly make you feel safe?",
  "If you had a whole day entirely to yourself, how would you fill it?",
  "What story about yourself are you ready to let go of?",
  "Write about a conversation that changed how you see things.",
  "What does success mean to you today — not what it used to mean?",
  "Name three things that light you up and explore why.",
  "Write about a time you surprised yourself.",
  "What does your inner critic sound like? Give it a character.",
  "Who in your life deserves more appreciation?",
  "Where do you want to be in five years — not in career terms, but in feeling?",
  "Write about something you take for granted.",
  "What is one habit you want to build and what's stopping you?",
  "Describe a failure that led to something better.",
  "What do you bring to the people around you?",
  "Write about a boundary you need to set.",
  "What seeds are you planting right now?",
  "How are you actually feeling right now — physically and emotionally?",
  "What are you in the middle of figuring out?",
  "Write about a dream you've quietly given up on. Is it really gone?",
  "What is one thing you want to take with you into June, and what do you want to leave in May?",
]

export async function GET() {
  try {
    const pdfBuffer = await generateFreePromptPDF(
      'May 2026',
      '31 Days of Journaling Prompts',
      mayPrompts
    )

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="PaperPause-May-2026-Prompts.pdf"',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    console.error('Freebie PDF error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
