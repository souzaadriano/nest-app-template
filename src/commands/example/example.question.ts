import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'task-questions' })
export class QuestionExample {
  @Question({
    message: 'What task would you like to execute?',
    name: 'task',
  })
  parseTask(val: string) {
    return val;
  }
}
