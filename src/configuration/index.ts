import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { LogConfig } from './log.config';
import { RedisConfig } from './redis.config';

export const appConfig = new AppConfig();
export const logConfig = new LogConfig();
export const databaseConfig = new DatabaseConfig();
export const redisConfig = new RedisConfig();
