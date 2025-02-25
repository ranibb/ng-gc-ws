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
    if(!this.geminiApiConfig.apiKey) {
      throw new Error('Gemini API key is required.');
    }
    this.genAI = new GoogleGenerativeAI(this.geminiApiConfig.apiKey);
  }
  
}
