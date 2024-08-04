import { validatePutDireccion } from '../../src/middleware/validatePutDireccion.middleware';
import { Request, Response, NextFunction } from 'express';

describe('validatePutDireccion middleware', () => {

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: {},
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('Deberia denegar la actualizacion si el id no es un numero', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      id: 'probando'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la actualizacion si no se le pasa un id', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la actualizacion si se le pasa un id en el body', async () => {
    mockRequest.body = {
      id: '1',
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      id: '1'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.id", 
            "message": "body.id cannot be changed"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el nombre de la calle tiene menos de 2 caracteres', async () => {
    mockRequest.body = {
      calle: 'a',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      id: '1'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.calle", 
            "message": "body.calle must be at least 2 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si la altura no es un numero', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: 'probando',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      id: '1'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.altura", 
            "message": "body.altura must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si la altura tiene menos de 1 caracter', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      id: '1'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.altura", 
            "message": "body.altura must be at least 1 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el nombre de la ciudad tiene menos de 2 caracteres', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'a'
    };

    mockRequest.params = {
      id: '1'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.ciudad", 
            "message": "body.ciudad must be at least 2 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el body tiene un dni', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad',
      personadni: 'probando'
    };

    mockRequest.params = {
      id: '1'
    }

    await validatePutDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.personadni", 
            "message": "body.personadni cannot be changed",
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });
});