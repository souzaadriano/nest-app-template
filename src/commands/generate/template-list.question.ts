import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'template-list' })
export class TemplateListQuestion {
  @Question({
    message: 'Choice a template',
    name: 'template',
    choices: ['pg-typed-config'],
    default: 'pg-typed-config',
  })
  parseTemplate(val: string) {
    return val;
  }
}
