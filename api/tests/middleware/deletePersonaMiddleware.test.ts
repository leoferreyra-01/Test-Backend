import { validateDeletePersonas } from '../../src/middleware/validateDeletePersona.middleware';
import { Request, Response, NextFunction } from 'express';

describe('validateDeletePersonas middleware', () => {

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('Deberia denegar el delete si el dni no es un numero', async () => {
    mockRequest.params = {
      dni: 'probando'
    };

    await validateDeletePersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.dni", 
            "message": "params.dni must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar el delete si el dni tiene menos de 7 caracteres', async () => {
    mockRequest.params = {
      dni: '12345'
    };

    await validateDeletePersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.dni", 
            "message": "params.dni must be at least 7 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar el delete si el dni tiene mas de 8 caracteres', async () => {
    mockRequest.params = {
      dni: '123456789'
    };

    await validateDeletePersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.dni", 
            "message": "params.dni must be at most 8 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar el delete si no se le paso un dni', async () => {
    mockRequest.params = {
    };

    await validateDeletePersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.dni", 
            "message": "params.dni is a required field"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });
});