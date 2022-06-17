const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_registro} = require('../../controllers/usuario-normal/registro.controllers');

router.get('/registro', get_registro);

module.exports = router;