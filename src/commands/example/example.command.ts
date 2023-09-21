import { Command, CommandRunner, InquirerService } from 'nest-commander';

@Command({ name: 'example', description: 'Helpe about commands', options: { isDefault: true } })
export class ExampleCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    const response = await this.inquirer.ask<{ task: string }>('task-questions', undefined);
    console.log(response.task);
  }
}
