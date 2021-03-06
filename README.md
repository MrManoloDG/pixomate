## Pix-o-mate

### Puesta en marcha

1. Ejecutar la base de datos de MySQL
2. Crear la base de datos pixomatemdg
3. En directorio raiz del proyecto crear el fichero *.env* donde introducir las credenciales
4. Ejecutar *npm install* en el directorio raíz del proyecto
5. Ejecutar *npm start* en el directorio raíz del proyecto

#### Credenciales en .env 

- GOREST_TOKEN=*"Token de api de usuarios"* (obligatorio)
- DB_USER=*"Usuario de la base de datos"* (Opcional, por defecto usa 'root')
- DB_PASSWORD=*"Contraseña del usuario de la base de datos"* (Opcional, por defecto usa '')
- DB_HOST=*"Dirección de la base de datos"* (Opcional, por defecto usa 'localhost')

## Estructura de ficheros

Los ficheros estan estructurado de manera que *'index.js'* es el fichero principal que ejecuta todo el servicio.
El fichero *'server.js'* contiene toda la inicialización y configuración del servidor de express, y *'db.js'* tiene la conexión con la base de datos
Dentro de la carpeta api encontramos 3 subcarpetas:
- controllers: La cual contiene los controladores y la logica de los distintos endpoints
- models: La cual contiene los modelos de la base de datos
- routes: La cual contiene las rutas de los distintos endpoints

Dentro de la carpeta postman del directorio raíz del proyecto se encuentra una colección de postman con ejemplos consultando a los diferentes endpoints.

## Misión 1
### Justificación de los tipos de datos elegidos Company

Los tipos de datos que son cadenas de caracteres son por regla general de tipo VARCHAR, ya que no superaran los 255 caracteres. A excepción del atributo description que es de tipo TEXT ya que contendrá mas de estos caracteres. 

Para el tipo fecha se ha usado el tipo DATE para almacenar la fecha en la base de datos, y status es un atributo binario es de tipo TINYINT(1)

### Justificación de los tipos de datos mostrados Company (Listar / Buscar)

Se han suprimidos los datos más sensibles como puede ser el atributo *'ccc'* y datos no tan relevantes para el Owner como el *'cif'*. Si se hubiese implementado la seguridad para editar mediante un token, este también deberia de ser omitido en la visualización.

## Misión 2

Creados los endpoints necesarios, para probar este apartado es muy importante que se haya establecido el token de la api en el fichero .env como se ha especificado anteriormente


## Misión 3B

La manera en la que se podría mejorar el rendimiento de las consultas de los owners al servicio externos seria el uso de una cache (Por ejemplo se puede usar la librería *node-cache*), y que esta almacene de manera temporal algunas consultas. Ademas de implementar el patron *Circuit breaker* para no saturar nuestro servicio cuando el externo no este funcionando correctamente. El patron *Circuit breaker* se puede implementar mediante la librería **Hystrix** desarrollada por Netflix.




