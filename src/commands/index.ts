import { appConfig } from '@/configuration';
import { APP_MODE } from '@/configuration/app.config';
import { ExampleCommand } from './example/example.command';
import { QuestionExample } from './example/example.question';
import { GenerateCommand } from './generate/generate.command';
import { TemplateListQuestion } from './generate/template-list.question';

export const CommandProviders =
  appConfig.mode !== APP_MODE.CLI ? [] : [ExampleCommand, QuestionExample, TemplateListQuestion, GenerateCommand];
