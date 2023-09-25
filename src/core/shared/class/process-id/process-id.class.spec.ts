import { Uuid } from '../uuid/uuid.class';
import { ProcessId } from './process-id.class';

describe('ProcessId', () => {
  it('should create a ProcessId instance', () => {
    const context = 'testContext';
    const uuidValue = 'testUuid';
    const uuid = new Uuid(uuidValue);

    const processId = new ProcessId(context, uuid);

    expect(processId.context).toBe(context);
    expect(processId.value).toBe(`${context}:${uuidValue}`);
  });

  it('should create a ProcessId with a random UUID', () => {
    const context = 'testContext';
    const processId = ProcessId.create(context);

    expect(processId.context).toBe(context);
    expect(processId.value).toBeDefined();
  });
});
