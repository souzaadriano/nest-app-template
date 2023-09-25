import { ProcessId } from '../process-id/process-id.class';

describe('ProcessId', () => {
  it('should create a ProcessId instance', () => {
    const context = 'testContext';

    const processId = new ProcessId(context, { value: 'testUuid' });

    expect(processId.context).toBe(context);
    expect(processId.value).toBe(`${context}:testUuid`);
  });

  it('should create a ProcessId with a random UUID', () => {
    const context = 'testContext';
    const validateUuid = new RegExp('\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}');
    const processId = ProcessId.create(context);
    const [ctx, uuid] = processId.value.split(':');

    expect(ctx).toBe(context);
    expect(processId.context).toBe(context);
    expect(processId.value).toBeDefined();
    expect(validateUuid.test(uuid)).toBeTruthy();
  });
});
