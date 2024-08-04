import { validatePostDireccion } from '../../src/middleware/validatePostDireccion.middleware';
import { Request, Response, NextFunction } from 'express';

describe('validatePostDireccion middleware', () => {

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

  it('Deberia denegar la creacion si el dni no es un numero', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: 'probando'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.personadni", 
            "message": "params.personadni must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si el dni tiene menos de 7 caracteres', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '12345'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.personadni", 
            "message": "params.personadni must be at least 7 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si el dni tiene mas de 8 caracteres', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '123456789'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.personadni", 
            "message": "params.personadni must be at most 8 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si no se le paso un dni', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "params.personadni", 
            "message": "params.personadni is a required field"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si el nombre de la calle tiene menos de 2 caracteres', async () => {
    mockRequest.body = {
      calle: 'a',
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la creacion si no se le paso un nombre de calle', async () => {
    mockRequest.body = {
      altura: '123',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.calle", 
            "message": "body.calle is a required field"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si la altura no es un numero', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: 'probando',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la creacion si la edad tiene menos de 1 caracter', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.altura", 
            "message": "body.altura is a required field"
          },
          {
            "element": "body.altura", 
            "message": "body.altura must be at least 1 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si no se le paso una altura', async () => {
    mockRequest.body = {
      calle: 'calle',
      ciudad: 'ciudad'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.altura", 
            "message": "body.altura is a required field"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la creacion si el nombre de la ciudad tiene menos de 2 caracteres', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123',
      ciudad: 'a'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
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

  it('Deberia denegar la creacion si no se le paso un nombre de ciudad', async () => {
    mockRequest.body = {
      calle: 'calle',
      altura: '123'
    };

    mockRequest.params = {
      personadni: '12345678'
    }

    await validatePostDireccion(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "body.ciudad", 
            "message": "body.ciudad is a required field"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });
});