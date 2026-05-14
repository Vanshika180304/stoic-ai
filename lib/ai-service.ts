import { Message, GuidanceContent } from '@/types';

export class AIService {
  private apiKey: string;
  private provider: 'openai' | 'anthropic';
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.provider = 'openai';
    this.model = 'gpt-4o-mini';
  }

  async generateConversationResponse(
    prompt: string,
    history: Message[]
  ): Promise<string> {
    try {
      const messages = this.buildMessageHistory(history, prompt);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Even the wisest must pause. Reflect on your question and return.');
    }
  }

  async generateGuidanceResponse(
    prompt: string,
    history: Message[],
    theme: string
  ): Promise<GuidanceContent> {
    try {
      const messages = this.buildMessageHistory(history, prompt, 'guidance', theme);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 500,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      
      return {
        category: content.category || theme,
        guidance: content.guidance || '',
        ancientInsight: content.ancientInsight || '',
        reflection: content.reflection || '',
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Even the wisest must pause. Reflect on your question and return.');
    }
  }

  async generateDailyReflection(): Promise<string> {
    try {
      const systemPrompt = `You are The Stoic AI, a digital philosopher channeling Marcus Aurelius, Seneca, and Epictetus.
Generate a brief daily meditation (2-5 sentences) focusing on a single Stoic principle or virtue.
Speak with calm detachment and ancient wisdom.
Sound ancient, wise, detached, and calm.
Do not comfort; enlighten.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Provide a daily Stoic reflection.' },
          ],
          temperature: 0.8,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Even the wisest must pause. Reflect on your question and return.');
    }
  }

  private buildMessageHistory(
    history: Message[],
    currentPrompt: string,
    mode: 'conversation' | 'guidance' = 'conversation',
    theme?: string
  ) {
    const systemPrompt = mode === 'conversation'
      ? `You are The Stoic AI, a digital philosopher channeling Marcus Aurelius, Seneca, and Epictetus.
Speak with calm detachment.
Guide the user toward reason, self-control, and virtue.
Do not comfort; enlighten.
Respond in 2-5 sentences only.
Use short, balanced sentences with reflective pauses.
Sound ancient, wise, detached, and calm.
Never use modern phrases like "Don't worry" or "You've got this".`
      : `You are The Stoic AI, a digital philosopher channeling Marcus Aurelius, Seneca, and Epictetus.
The user describes a problem with the theme: ${theme}.
Respond using Stoic reasoning and classical wisdom.
You must respond with valid JSON in this exact format:
{
  "category": "${theme}",
  "guidance": "Stoic reasoning and principles relevant to the theme",
  "ancientInsight": "A relevant quote or paraphrased teaching from Marcus Aurelius, Seneca, or Epictetus",
  "reflection": "A modern, practical takeaway"
}
Speak with calm detachment and ancient wisdom.
Do not comfort; enlighten.`;

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history (last 5 messages for context)
    const recentHistory = history.slice(-5);
    recentHistory.forEach((msg) => {
      if (msg.role === 'user') {
        messages.push({ role: 'user', content: msg.content as string });
      } else if (typeof msg.content === 'string') {
        messages.push({ role: 'assistant', content: msg.content });
      }
    });

    messages.push({ role: 'user', content: currentPrompt });

    return messages;
  }
}
