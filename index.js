// console.log('hola mundo xdd');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Creando el Servidor de Express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use( cors() );

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') ); // el archivo auth.js tendra efecto en la ruta /api/auth
app.use( '/api/events', require('./routes/events') ); // el archivo events.js tendra efecto en la ruta /api/events

//TODO: CRUD, eventos

// Escuchar Peticiones
app.listen( process.env.PORT, () => {

    console.log(`Servidor corriene en el puerto ${ process.env.PORT }` );

});

// configurando express: https://www.udemy.com/course/react-cero-experto/learn/lecture/20364371#questions
// variables de entorno y carpeta publica: https://www.udemy.com/course/react-cero-experto/learn/lecture/20379903#questions
// conectar node a mongo dbatlas: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385145#questions
// crear un usuario en nuestra base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385933#questions
// configurar cors: https://www.udemy.com/course/react-cero-experto/learn/lecture/20399419#questions
