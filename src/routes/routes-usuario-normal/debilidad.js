const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_debilidad} = require('../../controllers/usuario-normal/debilidad.controllers');

router.get('/debilidad', get_debilidad);

module.exports = router;