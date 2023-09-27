import { writeFile } from 'fs/promises';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { generateCommandStrategies } from './generate-strategies';

@Command({ name: 'generate', description: 'Helpe about commands', options: { isDefault: true } })
export class GenerateCommand extends CommandRunner {
  private readonly _generateCommandStrategies = generateCommandStrategies;

  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    console.log('choice an item of a list');
    console.table(generateCommandStrategies.map((strategy) => strategy.name));
    const response = await this.inquirer.ask<{ template: string }>('template-list', undefined);
    const strategy = generateCommandStrategies.find((strategy) => strategy.name === response.template);
    if (!strategy) return console.log(`Strategy ${response.template} not found`);
    console.log(`running ${strategy.name}`);
    const { file, path } = await strategy.generate(undefined);
    console.log(`writing a file at ${path}`);
    await writeFile(path, file);
    console.log(`generated ${strategy.name}`);
  }
}
