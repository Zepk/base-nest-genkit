import { Module } from '@nestjs/common';
import { GenkitService } from './services/genkit/genkit.service';

@Module({
  providers: [GenkitService],
  exports: [GenkitService],
})
export class GenkitModule {}
