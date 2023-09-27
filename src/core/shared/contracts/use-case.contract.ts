import { Log } from '../class/log/log.class';

export interface IUseCase<INPUT, OUTPUT> {
  readonly context: string;
  execute(input: TStandardInput<INPUT>): Promise<OUTPUT>;
}

export type TStandardInput<T> = T & {
  log: Log;
  session: any;
};
