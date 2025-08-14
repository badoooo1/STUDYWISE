import { GEMINI_API_URL } from '../config/constants';
import type { QuizQuestion } from '../types/index';

export class GeminiService {
  private apiKey: string;

  constructor(apiKey: string = '') {
    this.apiKey = apiKey;
  }

  async generateSummary(notes: string): Promise<string> {
    const prompt = `Summarize the following notes concisely and clearly. Focus on the main points and key information:\n\n${notes}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Failed to generate summary');
    }

    return result.candidates[0].content.parts[0].text;
  }

  async generateQuiz(notes: string): Promise<QuizQuestion[]> {
    const prompt = `Based on the following notes, generate a 25-question multiple-choice quiz. Each question should have 4 options, and one must be the correct answer. The quiz should directly test understanding of the provided notes. Format the response as a JSON array of objects. Each object should have a 'question' (string), 'options' (array of 4 strings), and 'correctAnswer' (string, one of the options). If it is not possible to generate a quiz from the provided notes, return an empty array.`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt + '\n\nNotes:\n' + notes }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              "question": { "type": "STRING" },
              "options": {
                "type": "ARRAY",
                "items": { "type": "STRING" },
                "minItems": 4,
                "maxItems": 4
              },
              "correctAnswer": { "type": "STRING" }
            },
            "required": ["question", "options", "correctAnswer"]
          }
        }
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Failed to generate quiz');
    }

    const quizJsonString = result.candidates[0].content.parts[0].text;
    return JSON.parse(quizJsonString);
  }
}