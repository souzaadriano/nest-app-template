import { Uuid } from '../uuid/uuid.class';

export class ProcessId {
  readonly context: string;
  private readonly _id: Uuid;

  constructor(context: string, uuid: Uuid) {
    this.context = context;
    this._id = uuid;
  }

  static create(context: string) {
    return new ProcessId(context, Uuid.create());
  }

  get value(): string {
    return `${this.context}:${this._id.value}`;
  }
}
