import { MODEL, SYSTEM_PROMPT, TEMPERATURE } from '@/core/openai'
import { AIResponse } from '@/dtos'
import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

const openai = new OpenAI()

@Injectable()
export class AIService {
  constructor() {}
  async predictScore(saqAnswers: string): Promise<AIResponse>{
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        { role: 'user', content: saqAnswers }
      ],
      model: MODEL,
      temperature: TEMPERATURE,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(completion.choices[0].message.content)
  }
}
