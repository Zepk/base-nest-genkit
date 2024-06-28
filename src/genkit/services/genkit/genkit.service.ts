import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { gemini15FlashPreview, vertexAI, gemini15ProPreview } from '@genkit-ai/vertexai';
import { ZodTypeAny } from 'zod';

export type AcceptedModels = 'gemini15Pro' | 'gemini15Flash';

@Injectable()
export class GenkitService {
  constructor() {
    configureGenkit({
      plugins: [vertexAI({ projectId: process.env.GCP_PROJECT_ID, location: process.env.VERTEX_REGION })],
      logLevel: 'debug',
      enableTracingAndMetrics: true,
    });
  }

  // * outputSchema should be a zod shcema
  public async getDataFromFile(fileUrl: string, contentType: string, model: AcceptedModels, outputSchema: ZodTypeAny) {
    const modelReference = this.getModel(model);

    try {
      const generatedResponse = await generate({
        model: modelReference,
        prompt: [{ media: { contentType: contentType, url: fileUrl } }],
        output: { schema: outputSchema },
        config: { temperature: 0 },
      });

      const response = generatedResponse.output();

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  // If you want to get data from a different audio file you can edit this method
  public async getDataFromAudioFile(
    fileUrl: string,
    contentType: 'audio/mpeg',
    model: AcceptedModels,
    outputSchema: ZodTypeAny,
  ) {
    if (contentType != 'audio/mpeg') {
      throw new BadRequestException('Invalid content type');
    }

    const modelReference = this.getModel(model);

    try {
      const generatedResponse = await generate({
        model: modelReference,
        prompt: [{ media: { contentType: contentType, url: fileUrl } }],
        output: { schema: outputSchema },
        config: { temperature: 0 },
      });

      const response = generatedResponse.output();

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  private getModel(model: AcceptedModels) {
    switch (model) {
      case 'gemini15Pro':
        return gemini15ProPreview;
      case 'gemini15Flash':
        return gemini15FlashPreview;
      default:
        throw new InternalServerErrorException('Model not found');
    }
  }
}
