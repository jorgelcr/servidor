const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_CrearEvidencias} = require('../../controllers/usuario-normal/getcrearevidencias.controllers');

router.get('/', get_CrearEvidencias);

module.exports = router;