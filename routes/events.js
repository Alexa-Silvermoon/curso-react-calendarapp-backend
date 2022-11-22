/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

/* 
Rutas de Eventos
localhost:4000/api/events
*/

const router = Router();

// Todas tienes que pasar por la validación del JWT
// de la siguiente  forma el validarJWT se aplica a todas las rutas y asi no tengo necesidad de ponerlo uno por uno en cada una de las rutas
router.use( validarJWT );

// Obtener eventos 
// router.get('/', validarJWT , getEventos );
router.get('/', getEventos );
// localhost:4000/api/events

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento 
); // localhost:4000/api/events

// Actualizar Evento
// router.put('/:id', validarJWT, actualizarEvento );
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);// localhost:4000/api/events/ID_MONGO

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;

// creacion CRUD de eventos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20400285#questions
// validar campos necesarios: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402007#questions
// grabar evento en la base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402461#questions
