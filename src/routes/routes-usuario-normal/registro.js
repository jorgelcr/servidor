const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_registro, getUserByIdRegistros} = require('../../controllers/usuario-normal/registro.controllers');

router.get('/registro', get_registro);
router.get('/:id', getUserByIdRegistros); 
module.exports = router;