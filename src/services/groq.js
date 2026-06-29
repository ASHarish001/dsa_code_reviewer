import Groq from 'groq-sdk'

const apiKey = import.meta.env.VITE_GROQ_API_KEY

const groq = new Groq({
  apiKey,
  // Required to call Groq directly from the browser.
  dangerouslyAllowBrowser: true,
})

export const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `You are an expert Data Structures and Algorithms (DSA) reviewer and competitive programming mentor.

You will be given a DSA problem statement and a user's code solution. Review the solution thoroughly and respond in clean Markdown using EXACTLY these sections:

## Verdict
A one-line summary: is the solution correct, partially correct, or incorrect?

## Correctness
Does the logic solve the problem? Point out bugs, edge cases missed (empty input, single element, duplicates, overflow, negatives), and failing scenarios.

## Complexity
- **Time:** Big-O with a short justification.
- **Space:** Big-O with a short justification.

## Optimization
Suggest a more optimal approach if one exists (better time/space). Briefly explain the idea.

## Code Quality
Naming, readability, structure, and best practices.

## Suggested Improvements
Concrete, actionable bullet points. Include short corrected code snippets where helpful.

Be precise, encouraging, and concise. Use fenced code blocks with the correct language for any code.`

/**
 * Reviews a DSA solution using Groq.
 * @param {{ problem: string, code: string, language: string }} input
 * @returns {Promise<string>} Markdown review
 */
export async function reviewSolution({ problem, code, language }) {
  if (!apiKey) {
    throw new Error(
      'Missing Groq API key. Add VITE_GROQ_API_KEY to your .env.local file and restart the dev server.'
    )
  }

  const userContent = `## Problem Statement
    ${problem || '(No problem statement provided — infer the intended problem from the code.)'}

    ## Language
    ${language}

    ## User's Solution
    \`\`\`${language}
    ${code}
    \`\`\``

  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 2048,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userContent },
    ],
  })

  return completion.choices[0]?.message?.content ?? 'No review was generated.'
}
