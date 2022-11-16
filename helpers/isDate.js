
const moment = require('moment'); // para validar fechas


const isDate = ( value ) => { // usado en events.js de routes

    console.log( value );

    if ( !value ){

        return false;
    }

    const fecha = moment( value ); // no importa si la fecha viene como string, moment la traduce a fecha y establece si es correcta o no

    if ( fecha.isValid() ){ // fecha es booleano

        return true;

    } else {

        return false;

    }

}

module.exports = { isDate };
// validar campos necesarios: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402007#questions
// grabar evento en la base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402461#questions
