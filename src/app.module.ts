import { Module } from '@nestjs/common';
import { GenkitModule } from '@genkit/genkit.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || 'local'}.env`,
    }),
    GenkitModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
