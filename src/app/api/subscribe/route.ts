import { NextRequest, NextResponse } from 'next/server'

/**
 * Email interest registration endpoint.
 *
 * Accepts: { email, interest }
 * Currently logs signups. When Resend is connected, will send confirmation.
 */

export async function POST(request: NextRequest) {
  try {
    const { email, interest } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Placeholder: log the signup until Resend is connected
    console.log(`📝 Interest registered: ${email} → ${interest || 'general'}`)

    return NextResponse.json({
      success: true,
      message: "You're on the list!",
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
