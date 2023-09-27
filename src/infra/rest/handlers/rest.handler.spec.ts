import { LoggerService } from '@/infra/logger/services/logger-service.adapter';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';
import { RestHandler, TRestHandlerConstructor } from './rest.handler';

class SubSchema {
  @IsString()
  country: string;

  @IsString()
  phoneNumber: string;
}

class FakeSchema {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @Type(() => SubSchema)
  @IsObject()
  @ValidateNested({ each: true })
  profile: SubSchema;
}

describe('RestHandler', () => {
  // Mocks e variáveis ​​de teste
  const mockRequest: Request = mock<Request>();
  mockRequest.method = 'GET';
  mockRequest.path = '/abc/def';
  mockRequest.ip = '127.0.0.1';
  mockRequest.params = {};
  mockRequest.query = {};
  mockRequest.body = {};

  mockRequest.originalUrl = '/abc/def';
  const mockResponse = mock<Response>();
  mockResponse.status.mockReturnValue(mockResponse);
  const mockUseCase = {
    context: 'TestContext',
    execute: jest.fn(),
  };
  const mockLogger = mock<LoggerService>();

  const restHandlerInput: TRestHandlerConstructor = {
    request: mockRequest,
    response: mockResponse,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should handle a valid request', async () => {
    // Configure o comportamento do useCase.execute() para retornar um valor esperado
    mockUseCase.execute.mockResolvedValue({ result: 'success' });

    const restHandler = new RestHandler(restHandlerInput);

    const output = await restHandler.handle(mockUseCase, mockLogger);
    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ result: 'success' });
    expect(mockLogger.log).toHaveBeenCalledWith(expect.anything());
  });

  it('should handle a invalid valid request', async () => {
    // Configure o comportamento do useCase.execute() para retornar um valor esperado
    mockUseCase.execute.mockRejectedValue(new Error('teste'));

    const restHandler = new RestHandler(restHandlerInput);
    it('should handle a valid request with schema', async () => {
      // Configure o comportamento do useCase.execute() para retornar um valor esperado
      mockResponse.status.mockReturnValue(mockResponse);
      mockUseCase.execute.mockResolvedValue({ result: 'success' });
      const restHandler = new RestHandler({ ...restHandlerInput, Schema: FakeSchema });

      const output = await restHandler.handle(mockUseCase, mockLogger);
      expect(mockUseCase.execute).toHaveBeenCalledTimes(0);
      expect(mockLogger.log).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Input have 2 invalid fiels',
        code: 'INVALID_INPUT',
        reasons: [
          { target: 'name', message: 'name must be a string' },
          {
            target: 'age',
            message: 'age must be a number conforming to the specified constraints',
          },
        ],
      });
      expect(mockLogger.log).toHaveBeenCalledWith(expect.anything());
    });

    const output = await restHandler.handle(mockUseCase, mockLogger);
    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'teste', code: 'UNKNOWN', reasons: undefined });
    expect(mockLogger.log).toHaveBeenCalledWith(expect.anything());
  });

  it('should handle a invalid request with schema', async () => {
    // Configure o comportamento do useCase.execute() para retornar um valor esperado
    mockResponse.status.mockReturnValue(mockResponse);
    mockUseCase.execute.mockResolvedValue({ result: 'success' });
    const restHandler = new RestHandler({ ...restHandlerInput, Schema: FakeSchema });

    const output = await restHandler.handle(mockUseCase, mockLogger);
    expect(mockUseCase.execute).toHaveBeenCalledTimes(0);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Input have 2 invalid fiels',
      code: 'INVALID_INPUT',
      reasons: [
        { target: 'name', message: 'name must be a string' },
        {
          target: 'age',
          message: 'age must be a number conforming to the specified constraints',
        },
      ],
    });
    expect(mockLogger.log).toHaveBeenCalledWith(expect.anything());
  });

  it('should handle a valid request with schema', async () => {
    // Configure o comportamento do useCase.execute() para retornar um valor esperado
    mockRequest.body = { name: 'adriano', age: 29, profile: { country: 'BR', phoneNumber: '15988881234' } };
    mockResponse.status.mockReturnValue(mockResponse);
    mockUseCase.execute.mockResolvedValue({ result: 'success' });
    const restHandler = new RestHandler({ ...restHandlerInput, Schema: FakeSchema });

    const output = await restHandler.handle(mockUseCase, mockLogger);
    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ result: 'success' });
    expect(mockLogger.log).toHaveBeenCalledWith(expect.anything());
  });
});
