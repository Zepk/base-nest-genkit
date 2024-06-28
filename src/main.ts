import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureGenkit } from '@genkit-ai/core';
import { vertexAI } from '@genkit-ai/vertexai';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsAllowedOrigin = process.env.CORS_ALLOWED_ORIGIN === '*' ? '*' : process.env.CORS_ALLOWED_ORIGIN?.split(',');

  app.enableCors({
    origin: corsAllowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  configureGenkit({
    plugins: [vertexAI({ projectId: process.env.GCP_PROJECT_ID, location: process.env.VERTEX_REGION })],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
  });

  const port = process.env.PORT || '3000';

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
