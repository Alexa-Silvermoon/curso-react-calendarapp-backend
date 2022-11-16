
const { Schema, model } = require('mongoose');

// usado en events.js de controllers
const EventoSchema = Schema({ // estoy y en este mismo orden se guardan mis campos en mi tabla eventos en mi BD en mongo

    titulo:{

        type: String,
        required: [true, 'El titulo del evento es obligatorio']

    },
    notas:{

        type: String,

    },
    inicio:{ // events.js routes envia la fecha a isDate.js donde npm moment() la convierte en una fecha valida y asi se guarda en mongo

        type: Date,
        required: true

    },
    fin:{

        type: Date,
        required: true

    },
    usuario:{

        type: Schema.Types.ObjectId, // referencia al usuario que crea el evento
        ref: 'Usuario',
        required: true

    }

});

EventoSchema.method('toJSON', function(){

    const { __v, _id, ...object } = this.toObject(); // extraccion de __v, _id
    object.id = _id; // id sera como aparezca en el output de postman
    return object;

});

module.exports = model( 'Evento', EventoSchema );
// creacion modelo del evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20401421?start=0#questions
// grabar evento en la base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402461#questions
