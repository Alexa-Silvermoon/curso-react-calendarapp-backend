const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => { // usado en events.js routes

    // find() trae todos los eventos en mongo y populate() la asosiacion con su respectivo usuario
    // const eventos = await Evento.find().populate('user'); // trae todo el usuario
    const eventos = await Evento.find().populate('user','name');
    // console.log( eventos );

    res.json({

        ok: true,
        eventos

    });
}

const crearEvento = async ( req, res = response ) => { // usado en events.js routes

    const evento = new Evento( req.body ); // req.body viene desde postman y luego pasan al modelo de Evento.js
    // verificar que tenga el evento
    // console.log( evento );
    // const { title, notes, start, end } = req.body // viene desde postman

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({

            ok: true,
            evento: eventoGuardado
            /* 
            title,
            notes,
            start,
            end, 
            */

        })

    } catch (error) {

        console.log(error)

        res.status(500).json({

            ok: false,
            msg: 'Hable con el administrador'

        });

    }

}

const actualizarEvento = async( req, res = response ) => { // usado en events.js routes
    
    const eventoId = req.params.id; // params es la barra de parametros de postman
    const uid = req.uid;
    // console.log( eventoId );

    try {

        const evento = await Evento.findById( eventoId ); // buscar ese evento en mongo

        if ( !evento ) { // si el evento NO existe

            return res.status(404).json({

                ok: false,
                msg: 'Evento no existe por ese id'

            });

        }

        if ( evento.user.toString() !== uid ) { // convertir evento a string, SI los ID son diferentes

            return res.status(401).json({

                ok: false,
                msg: 'No tiene privilegio de editar este evento'

            });

        }

        // SI el ID existe
        const nuevoEvento = {
            
            ...req.body, // body desde postman
            user: uid

        }

        // ingresar los nuevos valores del evento en mongo
        // const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento ); // la primera vez al dar boton send a postman, trae los datos viejos desde mongo
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({

            ok: true,
            evento: eventoActualizado

        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({

            ok: false,
            msg: 'Hable con el administrador'

        });

    }

}

const eliminarEvento = async( req, res = response ) => { // usado en events.js routes

    const eventoId = req.params.id; // params es la barra de parametros de postman
    const uid = req.uid; // viene desde mongo

    try {

        const evento = await Evento.findById( eventoId ); // buscar ese evento en mongo

        if ( !evento ) { // si el evento NO existe

            return res.status(404).json({

                ok: false,
                msg: 'Evento no existe por ese id'

            });

        }

        if ( evento.user.toString() !== uid ) { // convertir evento a string, SI los ID son diferentes

            return res.status(401).json({

                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'

            });

        }

        await Evento.findByIdAndDelete( eventoId );
        
        res.json({ ok: true });
        
        // const eventoEliminado = await Evento.findByIdAndDelete( eventoId, { new: true } ); // trae los datos eliminados a postman desde mongo
        /* 
        res.json({

            ok: true,
            evento: eventoEliminado,
            msg: 'evento eliminado con exito'
    
        });
        */
        
    } catch (error) {

        console.log(error);

        res.status(500).json({

            ok: false,
            msg: 'Hable con el administrador'

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
