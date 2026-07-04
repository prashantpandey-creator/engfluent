import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const exerciseId = parseInt(params.id)
  const { answer } = await request.json()

  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId }
  })

  if (!exercise) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      system: 'You are an English teacher evaluating a student answer. The student is a Russian speaker. Determine if the answer is correct or acceptable. Provide a brief encouraging explanation or correction in Russian.',
      prompt: `Question: ${exercise.question}\nCorrect Answer: ${exercise.correctAnswer}\nStudent Answer: ${answer}`,
      schema: z.object({
        isCorrect: z.boolean(),
        feedback: z.string().describe('Encouraging feedback or grammar correction in Russian')
      })
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Grading failed' }, { status: 500 })
  }
}