import { Log } from '@/core/shared/class/log/log.class';

export interface ILoggerService {
  text(context: string, message: string): void;
  log(log: Log): void;
}
