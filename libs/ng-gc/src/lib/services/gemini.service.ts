import { inject, Injectable } from '@angular/core';
import { NGGC_API_CONFIG } from '../tokens/gemini-api-config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  geminiApiConfig = inject(NGGC_API_CONFIG);
  genAI: GoogleGenerativeAI;
  constructor() {
    if (!this.geminiApiConfig.apiKey) {
      throw new Error('Gemini API key is required.');
    }
    this.genAI = new GoogleGenerativeAI(this.geminiApiConfig.apiKey);
  }

  async analyze(text: string) {
    const prompt = `
    You are an expert sentiment analyst and I want you to analyze the sentiment of the text
    I will provide to you. With a rating from 0 = 10 in terms of intensity of the sentiment.
    Give an emoji for the particular rating.
    The sentiment can be positive, happy, appreciative, etc. Or negative, toxic, vulgar, etc.
    The response should be a stringified JSON in the following format:
    {
      "sentiment": string,
      "rating": number,
      "emoji": string,
      "category": "positive" | "negative"
    }
    This is the text: ${text}
    }
  `;
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    })
    const result = await model.generateContent([prompt])
    return result.response.text();
  }

}
