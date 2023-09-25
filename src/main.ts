import { Bootstrap } from './bootstrap';
import { appConfig } from './configuration';
import { APP_MODE } from './configuration/app.config';

const main = async () => {
  switch (appConfig.mode) {
    case APP_MODE.CLI:
      return await Bootstrap.cli();

    case APP_MODE.SERVER:
      return await Bootstrap.server(appConfig.port);

    default:
      return await Bootstrap.server(appConfig.port);
  }
};

main().catch(console.error);
