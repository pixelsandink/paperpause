import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToBuffer,
} from '@react-pdf/renderer'
import { generateMonthlySchedule, themes } from './themed-prompts'

// ── Hyphenation ─────────────────────────────────────────────────────
Font.registerHyphenationCallback((word) => [word])

// ── Colours ─────────────────────────────────────────────────────────
const colours = {
  cream: '#FAF8F5',
  bark: '#334155',
  lilac: '#A088CE',
  stone: '#94a3b8',
  faintLine: '#e2ddd8',
  watermark: '#cbd5e1',
}

// ── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    backgroundColor: colours.cream,
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 44,
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 6,
  },
  monthTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 28,
    color: colours.bark,
    textAlign: 'center',
  },
  themeLabel: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: colours.lilac,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: colours.faintLine,
    marginBottom: 14,
  },
  promptRow: {
    flexDirection: 'row',
    marginBottom: 5.5,
    paddingLeft: 2,
  },
  dayNumber: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    color: colours.bark,
    width: 22,
    textAlign: 'right',
    marginRight: 8,
    paddingTop: 0.5,
  },
  promptText: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: colours.bark,
    lineHeight: 1.45,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  watermark: {
    fontFamily: 'Times-Roman',
    fontSize: 7,
    color: colours.watermark,
    letterSpacing: 0.8,
  },
  watermarkDot: {
    color: colours.lilac,
  },
})

// ── Month names ─────────────────────────────────────────────────────
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// ── PDF Document Component ──────────────────────────────────────────
interface PromptSheetProps {
  themeId: string
  month: number // 0-indexed
  year: number
}

function PromptSheet({ themeId, month, year }: PromptSheetProps) {
  const theme = themes.find((t) => t.id === themeId) || themes[0]
  const schedule = generateMonthlySchedule(themeId, month, year)
  const monthName = monthNames[month]

  return (
    <Document
      title={`${monthName} ${year} — ${theme.label} — Paper Pause Club`}
      author="Paper Pause Club"
      subject={`${theme.label} journaling prompts for ${monthName} ${year}`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.monthTitle}>
            {monthName} {year}
          </Text>
          <Text style={styles.themeLabel}>
            {theme.label}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Prompts */}
        {schedule.map(({ day, prompt }) => (
          <View key={day} style={styles.promptRow} wrap={false}>
            <Text style={styles.dayNumber}>{day}.</Text>
            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        ))}

        {/* Footer watermark */}
        <View style={styles.footer} fixed>
          <Text style={styles.watermark}>
            paperpause<Text style={styles.watermarkDot}>.</Text>club
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// ── Custom prompt sheet (no theme) ──────────────────────────────────
interface FreeSheetProps {
  title: string
  subtitle: string
  prompts: string[]
}

function FreeSheet({ title, subtitle, prompts }: FreeSheetProps) {
  return (
    <Document
      title={`${title} — Paper Pause Club`}
      author="Paper Pause Club"
      subject={subtitle}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.monthTitle}>{title}</Text>
          <Text style={styles.themeLabel}>{subtitle}</Text>
        </View>

        <View style={styles.divider} />

        {prompts.map((prompt, i) => (
          <View key={i} style={styles.promptRow} wrap={false}>
            <Text style={styles.dayNumber}>{i + 1}.</Text>
            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.watermark}>
            paperpause<Text style={styles.watermarkDot}>.</Text>club
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// ── Export functions ─────────────────────────────────────────────────
export async function generatePromptPDF(
  themeId: string,
  month: number,
  year: number
): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <PromptSheet themeId={themeId} month={month} year={year} />
  )
  return Buffer.from(buffer)
}

export async function generateFreePromptPDF(
  title: string,
  subtitle: string,
  prompts: string[]
): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <FreeSheet title={title} subtitle={subtitle} prompts={prompts} />
  )
  return Buffer.from(buffer)
}
