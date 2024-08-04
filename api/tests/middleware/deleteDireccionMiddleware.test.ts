import { Request, Response, NextFunction } from 'express';
import { validateDeleteDireccion } from '../../src/middleware/validateDeleteDireccion.middleware';

describe('validateDeleteDireccion middleware', () => {

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

  it('Deberia denegar el delete si el id no es un numero', async () => {
    mockRequest.params = {
      id: 'probando'
    };

    await validateDeleteDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.id", 
            "message": "params.id must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar el delete si no se le paso un id', async () => {
    mockRequest.params = {
    };

    await validateDeleteDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.id", 
            "message": "params.id is a required field"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });
});