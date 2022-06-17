const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_unidad} = require('../../controllers/usuario-normal/unidad.controllers');

router.get('/unidad', get_unidad);

module.exports = router;