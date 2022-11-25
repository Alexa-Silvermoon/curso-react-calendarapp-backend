const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') ); // el archivo auth.js tendra efecto en la ruta /api/auth
app.use('/api/events', require('./routes/events') ); // el archivo events.js tendra efecto en la ruta /api/events

// activar esto solo si nuestro frontend con build esta dentro de la carpeta public del backend
/* app.get('*', ( req, res ) => {

    res.sendFile(__dirname + 'public/index.html');
}) */

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

// configurando express: https://www.udemy.com/course/react-cero-experto/learn/lecture/20364371#questions
// variables de entorno y carpeta publica: https://www.udemy.com/course/react-cero-experto/learn/lecture/20379903#questions
// conectar node a mongo dbatlas: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385145#questions
// crear un usuario en nuestra base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385933#questions
// configurar cors: https://www.udemy.com/course/react-cero-experto/learn/lecture/20399419#questions
