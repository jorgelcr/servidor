const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_usuario} = require('../../controllers/usuario-normal/usuario.controllers');

router.get('/', get_usuario);

module.exports = router;