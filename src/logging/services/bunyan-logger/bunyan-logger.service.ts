import { Injectable, LoggerService } from '@nestjs/common';
import * as bunyan from 'bunyan';

@Injectable()
export class BunyanLoggerService implements LoggerService {
  private readonly logger: bunyan;

  constructor() {
    this.logger = bunyan.createLogger({
      name: process.env.GCP_PROJECT_ID,
      streams: [{ stream: process.stdout, level: 'info' }],
    });
  }

  log(message: object) {
    this.logger.info(message);
  }

  error(message: object, trace?: string) {
    this.logger.error({ trace }, message);
  }

  warn(message: object) {
    this.logger.warn(message);
  }

  debug(message: object) {
    this.logger.debug(message);
  }

  verbose(message: object) {
    this.logger.trace(message);
  }
}
