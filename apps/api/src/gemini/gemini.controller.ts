import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ApiBody } from '@nestjs/swagger';
import RunModelDto from './dto/run-model.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('/run-model')
  @ApiBody({ type: RunModelDto })
  async run(@Body() data: { text: string }) {
    return await this.geminiService.run(data.text);
  }
}
