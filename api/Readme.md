# Instruciones para setup
## Instalacion de dependencias
Primero se debera correr el comando npm install en la carpeta /api 

**Importante:** Revisar estar parado en la carpeta anteriormente mencionada.
  ```bash
    $ cd /api
    $ npm install
  ```

## Base de datos
Una vez instaladas las dependencias debemos dar de alta la base de datos, para ello utilizaremos el archivo dentro de la carpeta "dump"

Este archivo lo utilizaremos para poder importar la estructura de datos, ademas de algunos datos de pruebas. Para ello ejemplificare con MySQL Workbench.

- Dentro de MySQL Workbench nos dirigiremos a la seccion de "Server". Alli seleccionarmeos la opcion "Data Import".

- Alli, en la ventana de "Import from Disk", seleccionaremos "Import from Self-Contained File" y buscaremos el archivo que se encuentra en la carpeta dump de este proyecto.

- Luego le daremos a "Start Import" y al cabo de un momento ya tendremos la base de datos en condiciones.

## Variables de entorno
Como ultimas configuraciones deberemos de establecer las variables de entorno que utiliza el proyecto. Estas seran de nuesta pc, por lo que deberas saber que informacion asociarle a cada variable.

A continuacion te dejo un ejemplo de como podrias armar tu archivo ".env" que debe encontrarte en esta misma carpeta "api"

```env
# Configuración de la base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345678
DB_NAME=TestTecnica
DB_PORT=3306

# Configuración del servidor
PORT=8000
```

**IMPORTANTE: Recuerda actualizar estas variables con las que corresponda en tu PC. Principalmente la vairable DB_PASSWORD**

## Testing
Una vez realizados los pasos anteriores estamos en condiciones de poder realizar pruebas.

Para iniciar la API de manera local, simplemente corremos el comando indicado, recuerda estar parado en la carpeta '/api'.

```bash
  $ cd /api
  $ npm run dev
```
Con esto podemos realizar diferentes llamado a la API mediante la documentacion de Postan que se encuentra en la carpta '/api/docs'.

Simplemente importamos esta configuracion y alli tendremos los diferentes endpoints con algunos datos de prueba.

## Test Unitario
Ahora bien, si desea correr los test unitarios, muy similar al caso anterior debe correr el comando indicado.

```bash
  $ cd /api
  $ npm test
  $ npm run test:watch
```

Como podemos ver, hay dos comandos diferentes para el testeo. Esto se debe a que, en el primer caso, podemos correr los test una sola vez o bien, en el segundo caso, podemos hacer que la dependencia que se encarga de correr los tests este revisando si hay algun cambio en los archivos y correr los tests nuevamente.