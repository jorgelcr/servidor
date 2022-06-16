const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_criterio} = require('../../controllers/usuario-normal/criterio.controllers');

router.get('/criterios', get_criterio);

module.exports = router;