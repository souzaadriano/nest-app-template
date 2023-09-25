import { TestException } from '../../exception/exception.mock';
import { ProcessId } from '../process-id/process-id.class';
import { LOG_TRIGGER } from './log-trigger.enum';
import { Log } from './log.class';

describe('Log', () => {
  it('should create a Log instance', () => {
    const context = 'testContext';
    const trigger = LOG_TRIGGER.REQUEST_USER;
    const pid = ProcessId.create('testPid');

    const log = new Log(context, trigger, pid);

    expect(log.createdAt).toBeDefined();
    expect(log.pid).toBeDefined();
    expect(log.context).toBe(context);
    expect(log.trigger).toBe(trigger);
  });

  it('should set and get values', () => {
    const log = new Log('testContext', LOG_TRIGGER.REQUEST_USER, ProcessId.create('testPid'));

    log.set('key1', 'value1');
    log.set('key2', 42);

    expect(log.get('key1')).toBe('value1');
    expect(log.get('key2')).toBe(42);
    expect(log.has('key1')).toBe(true);
    expect(log.has('key3')).toBe(false);
  });

  it('should create subcontexts', () => {
    const log = new Log('testContext', LOG_TRIGGER.REQUEST_USER, ProcessId.create('testPid'));

    log.subContext('subContext1', 'key1', 'value1');
    log.subContext('subContext2', 'key2', 42);

    const subContext1 = log.getSubContext('subContext1');
    const subContext2 = log.getSubContext('subContext2');

    expect(subContext1.get('key1')).toBe('value1');
    expect(subContext2.get('key2')).toBe(42);
  });

  it('should add exception details', () => {
    const log = new Log('testContext', LOG_TRIGGER.REQUEST_USER, ProcessId.create('testPid'));
    const exception = new TestException('Test exception');
    log.exception(exception);
    const exceptionDetails = log.get('exception');
    expect(exceptionDetails).toBeDefined();
  });

  it('should generate log data', () => {
    const log = new Log('testContext', LOG_TRIGGER.REQUEST_USER, ProcessId.create('testPid'));

    log.set('key1', 'value1');
    log.subContext('subContext1', 'key2', 42);
    const subContext2 = log.getSubContext('subContext2');
    subContext2.set('key3', 'value3');

    const logData = log.data();

    expect(logData.key1).toBe('value1');
    expect(logData.subContext1['key2']).toBe(42);
    expect(logData.subContext2['key3']).toBe('value3');
    expect(logData.elapsedTime).toBeGreaterThanOrEqual(0); // Ensure elapsed time is non-negative
    expect(logData.createdAt).toBeDefined();
    expect(logData.pid).toBeDefined();
    // You can add more specific assertions on the log data here
  });
});
