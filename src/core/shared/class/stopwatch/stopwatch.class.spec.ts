import { Stopwatch } from './stopwatch.class';

// Usar o jest.useFakeTimers() para controlar o tempo
jest.useFakeTimers();

describe('Stopwatch', () => {
  let stopwatch: Stopwatch;

  beforeEach(() => {
    stopwatch = new Stopwatch();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should measure elapsed time', () => {
    stopwatch.start();

    jest.advanceTimersByTime(100);

    stopwatch.step('step1');

    const elapsedTime = stopwatch.end();

    expect(elapsedTime).toBeGreaterThanOrEqual(100);
    expect(elapsedTime).toBeLessThanOrEqual(110);

    expect(stopwatch.elapsedTime()).toEqual(elapsedTime);
    expect(stopwatch.elapsedTime()).toBeGreaterThan(0);
    expect(stopwatch.elapsedTime()).toBeLessThanOrEqual(elapsedTime);
  });

  it('should throw an error if end() is called before start()', () => {
    expect(() => stopwatch.end()).toThrowError();
  });

  it('should throw an error if elapsedTime() is called before end()', () => {
    expect(() => stopwatch.elapsedTime()).toThrowError();
  });
});
