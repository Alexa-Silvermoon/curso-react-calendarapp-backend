
const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => { // usado en auth.js de routes

    // Manejo de errores
    const errors = validationResult( req );
    console.log( errors );

    if (  !errors.isEmpty() ){ // si NO hay errores

        return res.status(400).json({ //400 bad request

            ok: false,
            errors: errors.mapped() // errores serializados en un objeto

        });

    }

    next(); // si NO hay errores, entonces continuar con  el archivo de auth.js de controllers

}

module.exports = {

    validarCampos,

}

// custom middleware: https://www.udemy.com/course/react-cero-experto/learn/lecture/20384515#questions
