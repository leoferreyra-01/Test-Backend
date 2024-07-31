# PRUEBA TÉCNICA NODE
## Problema

Implementar una API Rest que permita guardar y listar varias personas con sus respectivas
direcciones con las siguientes características:
- PERSONA
  - A ) DNI (ID)
  - B) Nombre
  - C) Apellido
  - D) Edad
  - E) Foto

- DIRECCIÓN
  - F) ID
  - G) Calle
  - H) Número de calle
  - I) Ciudad

Una persona puede tener 1 o varias direcciones.

## A implementar:
1) Listado de personas con sus correspondientes direcciones: METHOD GET (Respetar
convenciones en la url)
2) Listado filtrado por A B y D: METHOD GET (Utilizar query parameters y respetar
convenciones)
3) Alta de persona: METHOD POST (Respetar convenciones en la url). Que reciba la foto
también.
4) Modificación de persona: METHOD PUT (Respetar convenciones en la url).
5) Eliminación de persona: METHOD DELETE (Respetar convenciones en la url).
6) Obtener un persona por ID
7) Exportar listado de personas a un archivo csv

## Consideraciones:
1) Cada endpoint debe tener su test unitario
2) Proveer algún tipo de documentación que permita probar los endpoints - ej colección de Postman o Swagger
3) Manejo de excepciones
4) Retornar mensaje y código acorde a la respuesta - ej 404 cuando el recurso no se encontró, 201 cuando un recurso es creado satisfactoriamente

## Consideración opcional:
5) Presentar la solución desplegada en un ambiente serverless

Utilizar DB a libre elección
