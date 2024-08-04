import { validatePutPersonas } from '../../src/middleware/validatePutPersona.middleware';
import { Request, Response, NextFunction } from 'express';

describe('validatePutPersonas middleware', () => {

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

  it('Deberia denegar la actualizacion si el dni no es un numero', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };
    mockRequest.params = {
      dni: 'probando',
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la actualizacion si el dni tiene menos de 7 caracteres', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la actualizacion si el dni tiene mas de 8 caracteres', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '123456789'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la actualizacion si no se le paso un dni', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la actualizacion si el body contiene un dni', async () => {
    mockRequest.body = {
      dni: '12345678',
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.dni", 
            "message": "body.dni cannot be changed"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el nombre contiene algun numero', async () => {
    mockRequest.body = {
      nombre: 'Juan3',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.nombre", 
            "message": "body.nombre must be a string whitout numbers"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el nombre tiene menos de 2 caracteres', async () => {
    mockRequest.body = {
      nombre: 'a',
      apellido: 'apellido',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.nombre", 
            "message": "body.nombre must be at least 2 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el apellido contiene algun numero', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'Perez3',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.apellido", 
            "message": "body.apellido must be a string whitout numbers"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si el apellido tiene menos de 2 caracteres', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'a',
      edad: '25',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.apellido", 
            "message": "body.apellido must be at least 2 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si la edad no es un numero', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: 'pro',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.edad", 
            "message": "body.edad must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si la edad tiene menos de 1 caracter', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.edad", 
            "message": "body.edad must be at least 1 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si la edad tiene mas de 3 caracteres', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '2500',
      foto: 'https://foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.edad", 
            "message": "body.edad must be at most 3 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la actualizacion si foto no es del formato url', async () => {
    mockRequest.body = {
      nombre: 'nombre',
      apellido: 'apellido',
      edad: '25',
      foto: 'foto.jpg'
    };

    mockRequest.params = {
      dni: '12345678'
    };

    await validatePutPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.foto", 
            "message": "body.foto must be a valid URL"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });
});