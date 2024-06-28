import { Module } from '@nestjs/common';
import { BunyanLoggerService } from '@logging/services/bunyan-logger/bunyan-logger.service';

@Module({
  providers: [BunyanLoggerService],
  exports: [BunyanLoggerService],
})
export class LoggingModule {}
