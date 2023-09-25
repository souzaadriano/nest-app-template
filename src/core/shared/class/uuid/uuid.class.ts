import { randomUUID } from 'crypto';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create() {
    return new Uuid(randomUUID());
  }
}
