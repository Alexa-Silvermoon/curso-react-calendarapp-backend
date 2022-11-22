const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => { // usado en auth.js routes

    // x-token headers
    const token = req.header('x-token'); // viene desde postman ruta localhost:4000/api/auth/renew

    if ( !token ) {

        return res.status(401).json({

            ok: false,
            msg: 'No hay token en la petición'

        });
        
    }

    try {
        
        const { uid, name } = jwt.verify( // del token se extrae el uid y el nombre

            token, // el token que viene desde el header x-token en postman se verifica con el que esta en el archivo .env
            process.env.SECRET_JWT_SEED

        );

        // console.log( payload );
        // estas son usadas en auth.js controllers en revalidarToken()
        req.uid = uid;
        req.name = name;

    } catch (error) {

        return res.status(401).json({

            ok: false,
            msg: 'Token no válido'

        });

    }

    next();

}

module.exports = {

    validarJWT

}

// revalidar JWT: https://www.udemy.com/course/react-cero-experto/learn/lecture/20398707?start=15#questions
