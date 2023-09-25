import { DateTime } from '../date-time/date-time.class';

export class Stopwatch {
  private readonly _steps = new Map<string, number>();
  private _ended = false;
  private _started = false;

  start(startedAt?: DateTime): void {
    if (this._started) return;
    this._started = true;
    this._steps.set('start', startedAt ? startedAt.timestamp() : DateTime.timestamp());
  }

  step(step: string): void {
    if (this._steps.has(step)) return;
    this._steps.set(step, DateTime.timestamp());
  }

  end(): number {
    if (this._ended) return this.elapsedTime();
    this._ended = true;
    this._steps.set('end', DateTime.timestamp());
    return this.elapsedTime();
  }

  elapsedTime() {
    if (!this._ended || !this._started) throw new Error();
    const start = this._steps.get('start');
    const end = this._steps.get('end');

    return end - start;
  }
}
