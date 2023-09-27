export interface IGenerateStrategy<INPUT> {
  readonly name: string;

  generate(input: INPUT): Promise<TGenerateStrategyOutput>;
}

export type TGenerateStrategyOutput = {
  file: string | Buffer;
  path: string;
};
