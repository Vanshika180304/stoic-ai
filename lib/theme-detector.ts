export class ThemeDetector {
  private static themes = [
    'fear',
    'anger',
    'indecision',
    'loss',
    'ambition',
    'attachment',
    'duty',
    'virtue',
    'mortality',
    'relationships',
    'ego',
    'desire',
    'confusion',
  ];

  private static keywords: Record<string, string[]> = {
    fear: ['afraid', 'scared', 'worry', 'anxious', 'nervous', 'terrified', 'panic', 'dread'],
    anger: ['angry', 'mad', 'furious', 'rage', 'irritated', 'frustrated', 'resentful', 'bitter'],
    indecision: ['decide', 'choice', 'uncertain', 'confused', 'torn', 'unsure', 'hesitant', 'doubt'],
    loss: ['lost', 'grief', 'death', 'died', 'gone', 'miss', 'mourning', 'bereaved'],
    ambition: ['success', 'achieve', 'goal', 'career', 'promotion', 'wealth', 'status', 'recognition'],
    attachment: ['attached', 'cling', 'need', 'dependent', 'obsessed', 'addicted', 'possessive'],
    duty: ['obligation', 'responsibility', 'should', 'must', 'duty', 'burden', 'commitment'],
    virtue: ['right', 'wrong', 'moral', 'ethical', 'good', 'bad', 'justice', 'honor'],
    mortality: ['death', 'dying', 'mortal', 'finite', 'end', 'life', 'existence'],
    relationships: ['friend', 'family', 'partner', 'relationship', 'love', 'marriage', 'divorce'],
    ego: ['pride', 'respect', 'reputation', 'image', 'ego', 'self', 'identity', 'validation'],
    desire: ['want', 'desire', 'crave', 'lust', 'pleasure', 'temptation', 'greed'],
    confusion: ['confused', 'lost', 'unclear', 'bewildered', 'perplexed', 'puzzled'],
  };

  static async detectTheme(dilemma: string): Promise<string> {
    const lowerDilemma = dilemma.toLowerCase();
    const themeScores: Record<string, number> = {};

    // Initialize scores
    this.themes.forEach(theme => {
      themeScores[theme] = 0;
    });

    // Score based on keyword matches
    Object.entries(this.keywords).forEach(([theme, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerDilemma.includes(keyword)) {
          themeScores[theme] += 1;
        }
      });
    });

    // Find theme with highest score
    let maxScore = 0;
    let detectedTheme = 'confusion'; // Default theme

    Object.entries(themeScores).forEach(([theme, score]) => {
      if (score > maxScore) {
        maxScore = score;
        detectedTheme = theme;
      }
    });

    // If no keywords matched, use AI-based detection as fallback
    if (maxScore === 0) {
      detectedTheme = await this.detectThemeWithAI(dilemma);
    }

    return detectedTheme;
  }

  private static async detectThemeWithAI(dilemma: string): Promise<string> {
    try {
      const apiKey = process.env.OPENAI_API_KEY || '';
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a Stoic philosopher analyzing human dilemmas. Identify the primary philosophical theme from this list: ${this.themes.join(', ')}. Respond with only one word - the theme name.`,
            },
            {
              role: 'user',
              content: dilemma,
            },
          ],
          temperature: 0.3,
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        return 'confusion';
      }

      const data = await response.json();
      const theme = data.choices[0].message.content.trim().toLowerCase();
      
      // Validate the theme is in our list
      return this.themes.includes(theme) ? theme : 'confusion';
    } catch (error) {
      console.error('Theme detection error:', error);
      return 'confusion';
    }
  }
}
