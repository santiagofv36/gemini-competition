import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('/run-model')
  async run(@Body() data: { text: string }) {
    return await this.geminiService.run(data.text);
  }
}
