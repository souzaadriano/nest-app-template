import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './configuration';

const main = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(appConfig.port);
};

main().catch(console.error);
