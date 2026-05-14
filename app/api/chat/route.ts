import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { Message } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Speak clearly. Your words must reach us.' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Brevity is wisdom. Speak with fewer words.' },
        { status: 400 }
      );
    }

    // Initialize AI service
    const aiService = new AIService();

    // Generate response
    const response = await aiService.generateConversationResponse(
      message,
      conversationHistory || []
    );

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'The path to wisdom encounters obstacles. Please try again.' 
      },
      { status: 500 }
    );
  }
}
