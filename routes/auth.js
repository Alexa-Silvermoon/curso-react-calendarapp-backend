const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

/* 
Rutas de Usuarios / Auth
localhost:4000/api/auth
*/

// los check se validan en auth.js de controllers, los check son los middlewares, los check son funciones que hacen validaciones
router.post('/new', [ 
                        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
                        check('correo', 'El email es obligatorio').isEmail(), 
                        check('password', 'El password debe ser de 6 o mas caracteres').isLength({ min: 6}),
                        validarCampos
                    
                    ], crearUsuario                    
); // ruta en postman: localhost:4000/api/auth/new

router.post('/', [

                    check('correo', 'El email es obligatorio').not().isEmpty(),
                    check('password', 'El password debe ser de 6 o mas caracteres').isLength({ min: 6}),
                    validarCampos

                ] ,loginUsuario 
); // ruta en postman: localhost:4000/api/auth

router.get('/renew', validarJWT, revalidarToken );

module.exports = router;

// creando rutas relacionadas a usuarios: https://www.udemy.com/course/react-cero-experto/learn/lecture/20380525#questions
// endpoint crear y login https://www.udemy.com/course/react-cero-experto/learn/lecture/20380977?start=15#questions
// recuperar informacion de un posteo https://www.udemy.com/course/react-cero-experto/learn/lecture/20381979#questions
// express validator, check y validationResult: https://www.udemy.com/course/react-cero-experto/learn/lecture/20382665?start=15#questions
// custom middleware: https://www.udemy.com/course/react-cero-experto/learn/lecture/20384515#questions
