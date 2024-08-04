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