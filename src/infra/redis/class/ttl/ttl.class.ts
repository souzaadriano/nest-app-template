import { THours, TMilliseconds, TMinutes, TSeconds } from './ttl.type';

export class TTL {
  private constructor(readonly value: number) {}

  static minutes(input: TMinutes): TTL {
    const { minutes } = input;
    return new TTL(minutes * 60 * 1000);
  }

  static seconds(input: TSeconds) {
    const { seconds } = input;
    return new TTL(seconds * 1000);
  }

  static milliseconds(input: TMilliseconds) {
    const { milliseconds } = input;
    return new TTL(milliseconds);
  }

  static hours(input: THours) {
    const { hours } = input;
    return new TTL(hours);
  }
}

export type TTimeToLiveConstructor = THours | TMilliseconds | TMinutes | TSeconds;
