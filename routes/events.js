const { Router } = require("express");
const router = Router();
const { check } = require('express-validator');
const { isDate } = require("../helpers/isDate");
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

/* 
Rutas de Eventos
localhost:4000/api/events
*/

// Todas las rutas tienen que pasar po la validacion de JWT
// de la siguiente  forma el validarJWT se aplica a todas las rutas y asi no tengo necesidad de ponerlo uno por uno en cada una de las rutas
router.use( validarJWT );

// Obtener eventos

// Obtener eventos
// router.get('/', validarJWT , getEventos );
router.get('/', getEventos );
// localhost:4000/api/events

// Crear un nuevo evento
router.post('/new', [

                        // validarJWT,
                        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
                        check('inicio', 'La fecha de inicio es obligatoria').custom( isDate ),
                        check('fin', 'La fecha de fin es obligatoria').custom( isDate ),
                        validarCampos

                    ], crearEvento
); // localhost:4000/api/events/new

// Actualizar evento
// router.put('/:id', validarJWT, actualizarEvento );
router.put('/:id', actualizarEvento );
// localhost:4000/api/events/ID_MONGO

// Borrar evento
// router.delete('/:id', validarJWT, eliminarEvento );
router.delete('/:id', eliminarEvento );
// localhost:4000/api/events/ID_MONGO

module.exports = router;

// creacion CRUD de eventos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20400285#questions
// validar campos necesarios: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402007#questions
// grabar evento en la base de datos: https://www.udemy.com/course/react-cero-experto/learn/lecture/20402461#questions
