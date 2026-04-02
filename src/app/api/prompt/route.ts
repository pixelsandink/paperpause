import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getRandomPrompt, promptDatabase } from '@/lib/prompts'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { currentPrompt, useAI } = await request.json()

    // Try database first (faster, no API cost)
    if (!useAI) {
      const prompt = getRandomPrompt(currentPrompt)
      return NextResponse.json({ prompt, source: 'database' })
    }

    // Fall back to AI generation if requested or database exhausted
    if (!process.env.ANTHROPIC_API_KEY) {
      // No API key — just use database
      const prompt = getRandomPrompt(currentPrompt)
      return NextResponse.json({ prompt, source: 'database' })
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: `Generate a single thoughtful journalling prompt for someone who wants to reflect, grow, and practise mindful writing.

The prompt should be:
- Warm and inviting, not clinical or therapy-like
- Open-ended, encouraging personal reflection
- Suitable for anyone, regardless of life stage
- Between one and three sentences maximum
- Different from this prompt: "${currentPrompt}"

Return only the prompt text, nothing else.`,
        },
      ],
    })

    const aiPrompt =
      message.content[0].type === 'text'
        ? message.content[0].text.trim()
        : getRandomPrompt(currentPrompt)

    return NextResponse.json({ prompt: aiPrompt, source: 'ai' })
  } catch (error) {
    console.error('Prompt generation error:', error)
    // Always fall back gracefully to database
    const fallback = getRandomPrompt()
    return NextResponse.json({ prompt: fallback, source: 'database' })
  }
}

export async function GET() {
  // Return a random database prompt (used for simple requests)
  const prompt = getRandomPrompt()
  return NextResponse.json({ prompt, source: 'database', total: promptDatabase.length })
}
