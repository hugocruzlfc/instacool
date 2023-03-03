

## Descripción del proyecto

El repositorio tiene dos carpetas, una llamada servidor y otra llamada cliente. El servidor es una aplicación de Node.js, y el cliente es una aplicación de React.js.

## Pasos para ejecutar el proyecto

### Servidor

Lo primero que vamos a hacer es ejecutar el servidor. Estos son los pasos:

- Entra en la carpeta del servidor: `cd servidor`
- Instala las dependencias: `npm install`
- Llena la base de datos de data: `npm run seed-db`
- Enciende el backend `npm run dev`

Si todo sale bien, el servidor va a estar encendido y escuchando en el puerto 3000. Vas a tener una nueva base de datos en MongoDB llamada "clontagram."

### Cliente

Una vez que el servidor se este ejecutando, podemos encender el cliente. Estos son los pasos:

- Entra en la carpeta del cliente: `cd cliente`
- Instala las dependencias: `npm install`
- Enciende el frontend: `npm start`
- Visita [http://localhost:3001](http://localhost:3001)
