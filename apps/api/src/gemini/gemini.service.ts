import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiModels } from 'lib';

@Injectable()
export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async run(text: string) {
    const model = this.genAI.getGenerativeModel({
      model: GeminiModels.GEMINI_PRO,
    });

    const result = await model.generateContent(text);

    const response = await result.response.text();

    return response;
  }
}
