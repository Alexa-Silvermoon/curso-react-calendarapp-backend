const { response } = require('express');
const bcrypt = require('bcryptjs'); // para encriptar contraseñas
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// const crearUsuario = ( req, res = express.response ) => { // usado en auth.js de routes
const crearUsuario = async( req, res = response ) => { // usado en auth.js de routes

    console.log( req.body ); // cmd: { name: 'Alexander', correo: 'alexander@gmail.com', password: '123456' }

    // const { name, correo, password } = req.body; // la req viene desde postman ( body, raw json)
    const { correo, password } = req.body; // la req viene desde postman ( body, raw json)

    try {

        // buscar si usuario registrandose YA existe con ese mismo correo en la BD
        let usuario = await Usuario.findOne( { correo: correo } );
        console.log( usuario );

        if ( usuario ){

            return res.status(400).json({

                ok: false,
                msg: 'un usuario existe con ese correo'

            });
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.nombre );

        res.status(201).json({ // 201 todo salio bien

            ok: true,
            uid: usuario.id, // uid traido desde mongo automaticamente
            nombre: usuario.nombre,
            token,
            msg: 'registro con exito',
            // user: req.body
            // name,
            // correo,
            // password

        });
        
    } catch (error) {

        console.log( error );

        res.status(500).json({

            ok: false,
            msg: 'por favor hablar con el administrador'

        });
        
    }


}

const loginUsuario = async( req, res = response ) => { // usado en auth.js de routes

    const { correo, password } = req.body; // la req viene desde postman ( body, raw json)

    try {

        const usuario = await Usuario.findOne( { correo: correo } );
        console.log( usuario );

        if ( !usuario ){

            return res.status(400).json({

                ok: false,
                msg: 'no existe un usuario con ese correo'

            });
        }

        // Confirmar los passwords, si el password en el login es el mismo en la BD
        // validPassword es booleano
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ){

            return res.status(400).json({

                ok: false,
                msg: 'contraseña incorrecta'

            });

        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.nombre );

        res.status(201).json({

            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            token,
            msg: 'login exitoso',

        });
        
    } catch (error) {

        console.log( error );

        res.status(500).json({

            ok: false,
            msg: 'por favor hablar con el administrador'

        });
        
    }

}

const revalidarToken = async( req, res = response ) => { // usado en auth.js de rutes

    const { uid, nombre } = req;   // viene desde validar-jwt.js

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, nombre );

    // console.log( 'se requiere el /' );
    res.json({

        ok: true,
        uid,
        nombre,
        token,
        msg: 'token renovado con exito'

    });

}

module.exports = {

    crearUsuario,
    loginUsuario,
    revalidarToken
}

// endpoint crear y login https://www.udemy.com/course/react-cero-experto/learn/lecture/20380977?start=15#questions
// recuperar informacion de un posteo https://www.udemy.com/course/react-cero-experto/learn/lecture/20381979#questions
// express validator, check y validationResult: https://www.udemy.com/course/react-cero-experto/learn/lecture/20382665?start=15#questions
// custom middleware: https://www.udemy.com/course/react-cero-experto/learn/lecture/20384515#questions
// crear un usuario en nuestra base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385933#questions
// validaciones del usuario no repetir correo: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385941#questions
// encriptar contraseñas: https://www.udemy.com/course/react-cero-experto/learn/lecture/20386305?start=15#questions
// login de usuario: https://www.udemy.com/course/react-cero-experto/learn/lecture/20387767#questions
// generar un JWT: https://www.udemy.com/course/react-cero-experto/learn/lecture/20388133#questions
// revalidar JWT: https://www.udemy.com/course/react-cero-experto/learn/lecture/20398707?start=15#questions
