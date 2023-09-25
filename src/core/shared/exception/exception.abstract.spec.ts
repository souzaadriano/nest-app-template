import { EXCEPTION_CODE } from './exception-code.enum';
import { TestException } from './exception.mock';

describe('AbstractException', () => {
  it('should set and get exception details', () => {
    const exception = new TestException('Test exception message');

    exception.set('key1', 'value1');
    exception.set('key2', 42);

    expect(exception.get('key1')).toBe('value1');
    expect(exception.get('key2')).toBe(42);
    expect(exception.get('nonexistentKey')).toBeUndefined();
  });

  it('should provide exception details', () => {
    const exception = new TestException('Test exception message');

    exception.set('key1', 'value1');
    exception.set('key2', 42);

    const details = exception.details();

    expect(details._issuedAt).toBeDefined();
    expect(details._message).toBe('Test exception message');
    expect(details._name).toBe('TestException');
    expect(details._trace).toBeDefined();
    expect(details._code).toBe(EXCEPTION_CODE.UNKNOWN);
    expect(details.key1).toBe('value1');
    expect(details.key2).toBe(42);
    expect(details.nonexistentKey).toBeUndefined();
  });
});
