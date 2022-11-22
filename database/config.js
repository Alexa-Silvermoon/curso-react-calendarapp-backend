const mongoose = require('mongoose');

const dbConnection = async() => { // usado en index.js en la raiz del proyecto

    try {
        
        await mongoose.connect( process.env.DB_CNN , { // archivo .env

            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true

            // las opciones de arriba ya no son necesarios, hoy es 11 de noviembre del 2022

        });

        console.log('DB Online');

    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de inicializar BD');

    }

}

module.exports = {
    dbConnection
}

// conectar node a mongo dbatlas: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385145#questions
// crear un usuario en nuestra base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385933#questions
