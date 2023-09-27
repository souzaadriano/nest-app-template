import { logConfig } from '@/configuration';
import { DATE_FORMAT } from '@/core/shared/class/date-time/date-format.enum';
import { DateTime } from '@/core/shared/class/date-time/date-time.class';
import pino, { Logger } from 'pino';

export abstract class PinoFactory {
  private static readonly _config = logConfig;

  static factory(): Logger {
    const destination = PinoFactory._getPath();
    const level = 'info';
    const bindings = () => ({});
    const targets = [{ target: 'pino/file', options: { destination }, level }];
    if (logConfig.console) targets.push(PinoFactory._setConsole(level));

    return pino({
      formatters: { bindings },
      transport: { targets },
    });
  }

  private static _setConsole(level: string): any {
    return { target: 'pino-pretty', options: { colorize: true, singleLine: true }, level };
  }

  private static _getPath() {
    const today = DateTime.now().format(DATE_FORMAT.DATE_ONLY);
    return `${process.cwd()}${PinoFactory._config.path}/${today}.log`;
  }
}
