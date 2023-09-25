import { Environment } from 'environment-variables-decorator';

export class LogConfig {
  @Environment('LOG_PATH', '/logs')
  path: string;

  @Environment('LOG_CONSOLE', true)
  console: boolean;
}
