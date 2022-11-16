const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre ) => { // usado en auth.js de controllers

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, nombre };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, { // firmar el token

            expiresIn: '6h' // los token se vencen cada 12 horas

        }, ( err, token ) => {

            if ( err ){ // si hay algun error

                console.log( err );
                reject('No se pudo generar el JWT');

            } else {

                resolve( token ); // si todo salio bien, enviar el JWT firmado

            }

        })

    })

}

module.exports = {

    generarJWT
}

// generar un JWT: https://www.udemy.com/course/react-cero-experto/learn/lecture/20388133#questions
// revalidar JWT: https://www.udemy.com/course/react-cero-experto/learn/lecture/20398707?start=15#questions
