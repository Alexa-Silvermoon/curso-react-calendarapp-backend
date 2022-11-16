
const { response } = require('express');
const Evento = require('../models/evento');


/* {
    ok: true,
    msg: 'getEventos'
} 
*/
const getEventos = async( req, res = response ) => { // usado en events.js routes

    // find() trae todos los eventos en mongo y populate() la asosiacion con su respectivo usuario
    // const eventos = await Evento.find().populate('usuario'); // trae todo el usuario
    const eventos = await Evento.find().populate('usuario','nombre'); // del usuario solo trae nombre y el id
    console.log( eventos );

    res.json({

        ok: true,
        eventos,
        msg: 'eventos traidos con exito'

    });

}

/* {
    ok: true,
    msg: 'crearEvento'
} 
*/
const crearEvento = async( req, res = response ) => { // usado en events.js routes

    // verificar que tenga el evento
    console.log( req.body );
    // const { titulo, notas, inicio, fin } = req.body // viene desde postman
    const evento = new Evento( req.body ); // req.body viene desde postman y luego pasan al modelo de Evento.js

    try {

        evento.usuario = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({

            ok: true,
            evento: eventoGuardado,
            /* 
            titulo,
            notas,
            inicio,
            fin, 
            */
            msg: 'evento creado con exito'
    
        });

        
    } catch (error) {

        console.log( error );

        res.status(500).json({

            ok: false,
            msg: 'hable con el administrador'

        });
        
    }

}

/* {
    id: 123zxc
    ok: true,
    msg: 'actualizarEvento'
} 
*/
const actualizarEvento = async( req, res = response ) => { // usado en events.js routes

    const eventoId = req.params.id; // params es la barra de parametros de postman
    const uid = req.uid; // viene desde mongo
    console.log( eventoId );

    try {

        const evento = await Evento.findById( eventoId ); // buscar ese evento en mongo

        if ( !evento ){ // si el evento NO existe

            return res.status(400).json({

                ok: false,
                msg: 'no existe un evento con ese ID'

            });
        }

        if ( evento.usuario.toString() !== uid ){ // convertir evento a string, SI los ID son diferentes

            return res.status(401).json({

                ok: false,
                msg: 'NO tiene autorizacion para editar este evento'

            });

        }

        // SI el ID existe
        const nuevoEvento = {

            ...req.body, // body desde postman
            usuario: uid

        }

        // ingresar los nuevos valores del evento en mongo
        // const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento ); // la primera vez al dar boton send a postman, trae los datos viejos desde mongo
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); // trae los datos nuevo a postman desde mongo

        res.json({

            ok: true,
            evento: eventoActualizado,
            msg: 'evento actualizado con exito'
    
        });
        
    } catch (error) {

        console.log( error );
        res.status(500).json({

            ok: false,
            msg: 'hable con el administrador'

        });
        
    }

}

/* {
    id: 123zxc
    ok: true,
    msg: 'eliminarEvento'
} 
*/
const eliminarEvento = async( req, res = response ) => { // usado en events.js routes

    const eventoId = req.params.id; // params es la barra de parametros de postman
    const uid = req.uid; // viene desde mongo
    console.log( eventoId );

    try {

        const evento = await Evento.findById( eventoId ); // buscar ese evento en mongo

        if ( !evento ){ // si el evento NO existe

            return res.status(400).json({

                ok: false,
                msg: 'no existe un evento con ese ID'

            });
        }

        if ( evento.usuario.toString() !== uid ){ // convertir evento a string, SI los ID son diferentes

            return res.status(401).json({

                ok: false,
                msg: 'NO tiene autorizacion para eliminar este evento'

            });

        }

        // const eventoEliminado = await Evento.findByIdAndDelete( eventoId ); // NO trae los datos nuevo a postman desde mongo
        const eventoEliminado = await Evento.findByIdAndDelete( eventoId, { new: true } ); // trae los datos nuevo a postman desde mongo

        res.json({

            ok: true,
            evento: eventoEliminado,
            msg: 'evento eliminado con exito'
    
        });
        
    } catch (error) {

        console.log( error );
        res.status(500).json({

            ok: false,
            msg: 'hable con el administrador'

        });
        
    }
    

}

module.exports = {

    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}

// creacion CRUD de eventos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20400285#questions
// grabar evento en la base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402461#questions
// obtener listado de eventos, metodo GET: https://www.udemy.com/course/react-cero-experto/learn/lecture/20403993?start=15#questions
// actualizar un evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20404337#questions
// eliminar un evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20405415#questions
