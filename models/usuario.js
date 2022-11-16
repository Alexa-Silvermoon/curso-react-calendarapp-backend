const { Schema, model } = require('mongoose');

// usado en auth.js de controllers
const UsuarioSchema = Schema({ // estoy y en este mismo orden se guardan mis campos en mi tabla usuarios en mi BD en mongo

    nombre:{

        type: String,
        required: [true, 'El nombre es obligatorio']

    },
    correo:{

        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // el correo debe ser unico y nunca se debe repetir

    },
    password:{

        type: String,
        required: [true, 'La contraseña es obligatorio']

    },


});

module.exports = model('Usuario', UsuarioSchema );
// Usuario usado en auth.js de controllers
// crear un usuario en nuestra base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385933#questions
// validaciones del usuario no repetir correo: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385941#questions
