import { NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

export abstract class Bootstrap {
  static async server(port: number) {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(port);
  }

  static async cli() {
    await CommandFactory.run(AppModule, ['warn', 'error']);
    process.exit(0);
  }
}
