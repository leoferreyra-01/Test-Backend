import { Request, Response, NextFunction } from 'express';

import { validateGetPersonas } from '../../src/middleware/validateGetPersonas.middleware';

describe('validateGetPersonas middleware', () => {

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      query: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('Deberia denegar la buscqueda si el dni no es un numero', async () => {
    mockRequest.query = {
      dni: 'abc123'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.dni", 
            "message": "query.dni must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la buscqueda si el dni tiene menos de 1 caracter', async () => {
    mockRequest.query = {
      dni: ''
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.dni", 
            "message": "query.dni must be at least 1 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la buscqueda si el dni es mayor a 8 caracteres', async () => {
    mockRequest.query = {
      dni: '123456789'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.dni", 
            "message": "query.dni must be at most 8 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la busqueda si la edad no es un numero', async () =>{
    mockRequest.query = {
      edad: 'abc'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.edad", 
            "message": "query.edad must be a number"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la busqueda si la edad tiene menos de un caracter', async () =>{
    mockRequest.query = {
      edad: ''
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.edad", 
            "message": "query.edad must be at least 1 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la busqueda si la edad tiene mas de 3 caracter', async () =>{
    mockRequest.query = {
      edad: '4000'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.edad", 
            "message": "query.edad must be at most 3 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la busqueda si el nombre contiene algun numero', async () => {
    mockRequest.query = {
      nombre: 'Juan3'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.nombre", 
            "message": "query.nombre must be a string whitout numbers"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia denegar la busqueda si el nombre tiene menos de 2 caracteres', async () => {
    mockRequest.query = {
      nombre: 'a'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      "errors": 
        [
          {
            "element": "query.nombre", 
            "message": "query.nombre must be at least 2 characters"
          }
        ]
      }));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Deberia permitir la busqueda a pesar de que no se le pase algun parametro', async () => {
    mockRequest.query = {
      nombre: 'Juan',
      edad: '30'
    };

    await validateGetPersonas(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});