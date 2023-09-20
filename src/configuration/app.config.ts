import { Environment, Option, Singleton } from 'environment-variables-decorator';

@Singleton
export class AppConfig {
  @Option({ options: ['local', 'production', 'development'] })
  @Environment('NODE_ENV', 'local')
  environment: string;

  @Environment('APP_PORT', 6000)
  port: number;

  @Environment('APP_NAME', 'Business-Manager-Api')
  name: string;
}
