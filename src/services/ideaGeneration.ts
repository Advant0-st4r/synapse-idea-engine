import { useApiKeys } from '@/contexts/ApiKeyContext';

export interface IdeaGenerationRequest {
  insight: string;
  constraints: {
    innovativeness: number;
    practicality: number;
    budget: number;
    complexity: number;
    timeToMarket: number;
  };
}

export interface GeneratedIdea {
  id: string;
  title: string;
  summary: string;
  demand: number;
  feasibility: number;
  roi: number;
  category: string;
  marketSize: string;
  timeline: string;
}

const OPENAI_API_BASE = 'https://api.openai.com/v1';
const ANTHROPIC_API_BASE = 'https://api.anthropic.com/v1';

export const generateIdeas = async (
  request: IdeaGenerationRequest,
  apiKey: string,
  model: string
): Promise<GeneratedIdea[]> => {
  const systemPrompt = `You are an expert business analyst and entrepreneur. Your task is to generate creative, actionable business ideas based on user insights and constraints.

Given an insight and constraints, generate 4-5 unique business ideas that:
1. Directly leverage or address the provided insight
2. Match the specified constraint preferences (1-10 scale)
3. Are realistic and implementable
4. Have clear value propositions

For each idea, provide:
- Title: Clear, compelling name
- Summary: 2-3 sentence description
- Demand: Market demand score (1-100)
- Feasibility: Implementation feasibility (1-100) 
- ROI: Return on investment potential (1-100)
- Category: Business category/industry
- Market Size: Estimated market size
- Timeline: Implementation timeline

Constraint meanings:
- Innovativeness (1=traditional, 10=breakthrough): How novel/disruptive
- Practicality (1=experimental, 10=proven): How feasible/realistic
- Budget (1=bootstrap, 10=well-funded): Required investment level
- Complexity (1=simple, 10=enterprise): Business model sophistication
- Time to Market (1=long-term, 10=immediate): Speed to launch

Return only valid JSON array of ideas.`;

  const userPrompt = `Insight: "${request.insight}"

Constraints:
- Innovativeness: ${request.constraints.innovativeness}/10
- Practicality: ${request.constraints.practicality}/10  
- Budget: ${request.constraints.budget}/10
- Complexity: ${request.constraints.complexity}/10
- Time to Market: ${request.constraints.timeToMarket}/10

Generate 4-5 business ideas in JSON format.`;

  try {
    let response;
    
    if (model.startsWith('gpt-') || model.startsWith('o1-')) {
      // OpenAI API
      response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
          max_tokens: 2000,
        }),
      });
    } else if (model.startsWith('claude-')) {
      // Anthropic API
      response = await fetch(`${ANTHROPIC_API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 2000,
          messages: [
            { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
          ],
        }),
      });
    } else {
      throw new Error(`Unsupported model: ${model}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    let generatedText = '';

    if (model.startsWith('gpt-') || model.startsWith('o1-')) {
      generatedText = data.choices[0].message.content;
    } else if (model.startsWith('claude-')) {
      generatedText = data.content[0].text;
    }

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in API response');
    }

    const ideas = JSON.parse(jsonMatch[0]);
    
    // Add unique IDs and validate structure
    return ideas.map((idea: any, index: number) => ({
      id: `generated-${Date.now()}-${index}`,
      title: idea.title || 'Untitled Idea',
      summary: idea.summary || 'No description provided',
      demand: Math.min(100, Math.max(1, idea.demand || 70)),
      feasibility: Math.min(100, Math.max(1, idea.feasibility || 70)),
      roi: Math.min(100, Math.max(1, idea.roi || 70)),
      category: idea.category || 'Other',
      marketSize: idea.marketSize || 'TBD',
      timeline: idea.timeline || 'TBD',
    }));

  } catch (error) {
    console.error('Error generating ideas:', error);
    throw error;
  }
};