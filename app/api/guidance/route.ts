import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { ThemeDetector } from '@/lib/theme-detector';
import { Message } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dilemma, conversationHistory } = body;

    // Validate input
    if (!dilemma || typeof dilemma !== 'string') {
      return NextResponse.json(
        { error: 'Speak clearly. Your dilemma must reach us.' },
        { status: 400 }
      );
    }

    if (dilemma.length > 1000) {
      return NextResponse.json(
        { error: 'Brevity is wisdom. Speak with fewer words.' },
        { status: 400 }
      );
    }

    // Detect theme
    const theme = await ThemeDetector.detectTheme(dilemma);

    // Initialize AI service
    const aiService = new AIService();

    // Generate structured guidance
    const guidanceContent = await aiService.generateGuidanceResponse(
      dilemma,
      conversationHistory || [],
      theme
    );

    return NextResponse.json({
      category: guidanceContent.category,
      guidance: guidanceContent.guidance,
      ancientInsight: guidanceContent.ancientInsight,
      reflection: guidanceContent.reflection,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Guidance API Error:', error);
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
