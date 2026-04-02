export const promptDatabase: string[] = [
  // Self-reflection
  "What is one thing you've been avoiding thinking about? Write about why.",
  "Describe the version of yourself you're most proud of. What were you doing?",
  "What would you do differently if you knew no one was watching?",
  "Write about a belief you hold that you've never questioned.",
  "What does your ideal ordinary day look like?",
  "When did you last feel truly at peace? What were the conditions?",
  "What are you pretending not to know?",
  "Write a letter to the person you were five years ago.",
  "What are you most afraid of losing?",
  "Name three things that light you up and explore why.",

  // Gratitude & presence
  "Describe a small moment from this week that deserves more attention.",
  "What ordinary thing in your life would you miss most?",
  "Write about someone who has shaped who you are without knowing it.",
  "What does home mean to you right now?",
  "Describe the last time you were completely present in a moment.",
  "What sounds, smells, or textures instantly make you feel safe?",
  "Write about something you take for granted.",
  "What season of your life are you in right now?",
  "List ten things that made you smile in the last week.",
  "What are you grateful for that you rarely think to mention?",

  // Creativity & imagination
  "If your life were a novel, what chapter are you in right now?",
  "Write about a place you've never been but feel drawn to.",
  "If you could have dinner with any person — living or dead — what would you ask them?",
  "Describe your dream creative project with no limits.",
  "If you had a whole day entirely to yourself, how would you fill it?",
  "What does your inner critic sound like? Give it a character.",
  "Write about a colour that describes your current mood.",
  "If you could learn anything overnight, what would it be and why?",
  "Invent a new tradition you wish existed.",
  "Write the first paragraph of your memoir.",

  // Growth & challenge
  "What has been your greatest teacher this year?",
  "Write about a time you surprised yourself.",
  "What is one habit you want to build and what's stopping you?",
  "Describe a failure that led to something better.",
  "What does courage look like in your daily life?",
  "What story about yourself are you ready to let go of?",
  "Write about a boundary you need to set.",
  "What would you do if you weren't afraid of getting it wrong?",
  "What are you in the middle of figuring out?",
  "Name one thing you've been meaning to say to someone.",

  // Connection & relationships
  "Write about someone you miss.",
  "Describe a conversation that changed how you see things.",
  "Who in your life deserves more appreciation?",
  "Write about a friendship that has shaped you.",
  "What do you wish people understood about you?",
  "Describe a moment when a stranger was unexpectedly kind.",
  "What do you bring to the people around you?",
  "Write about a relationship that has taught you the most.",
  "Who do you feel most yourself around?",
  "Write about a moment of unexpected connection.",

  // Dreams & future
  "Where do you want to be in five years — not in career terms, but in feeling?",
  "What would you regret not trying?",
  "Write about a dream you've quietly given up on. Is it really gone?",
  "What legacy do you want to leave?",
  "Describe the life you're building.",
  "What does success mean to you today — not what it used to mean?",
  "If your future self could send you one message, what would it say?",
  "What seeds are you planting right now?",
  "Write about something you're quietly hoping for.",
  "What would make this year memorable?",

  // Body & rest
  "How are you actually feeling right now — physically and emotionally?",
  "Write about what rest means to you.",
  "When did you last truly recharge? What did that look like?",
  "What does your body need that you've been ignoring?",
  "Write about a time you pushed through when you should have stopped.",
  "What does slowing down feel like for you?",
  "Describe your relationship with sleep.",
  "What does your body do well that you rarely acknowledge?",
  "Write about the last time you felt strong.",
  "What self-care actually works for you, beyond the obvious?",

  // Seasons & nature
  "Write about what this season means to you.",
  "Describe the view from your favourite window.",
  "What does your local landscape look like right now?",
  "Write about a walk you took recently.",
  "What sounds of nature calm you most?",
  "Describe a moment in nature that stayed with you.",
  "How does the weather affect your mood?",
  "Write about your relationship with the outdoors.",
  "What does morning look like where you are?",
  "Describe the light today.",
]

/**
 * Gets a deterministic daily prompt based on today's date.
 * Everyone sees the same prompt on the same day.
 */
export function getDailyPrompt(): string {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
    (1000 * 60 * 60 * 24)
  )
  const index = (dayOfYear + today.getFullYear()) % promptDatabase.length
  return promptDatabase[index]
}

/**
 * Gets a random prompt from the database, optionally excluding one.
 */
export function getRandomPrompt(exclude?: string): string {
  const available = exclude
    ? promptDatabase.filter(p => p !== exclude)
    : promptDatabase
  return available[Math.floor(Math.random() * available.length)]
}
