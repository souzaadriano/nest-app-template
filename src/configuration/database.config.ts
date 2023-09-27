import { Environment } from 'environment-variables-decorator';

export class DatabaseConfig {
  @Environment('DB_HOST', 'localhost')
  host: string;

  @Environment('DB_PORT', 6001)
  port: number;

  @Environment('DB_NAME', 'business_manager')
  name: string;

  @Environment('DB_USER', 'db_user')
  user: string;

  @Environment('DB_PASSWORD', 'db_pass')
  password: string;

  @Environment('DATABASE_URL')
  url: string;
}
