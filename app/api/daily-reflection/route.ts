import { NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';

export async function GET() {
  try {
    // Initialize AI service
    const aiService = new AIService();

    // Generate daily reflection
    const reflection = await aiService.generateDailyReflection();

    return NextResponse.json({
      reflection,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Daily Reflection API Error:', error);
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
