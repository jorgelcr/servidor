const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_proceso} = require('../../controllers/usuario-normal/proceso.controllers');

router.get('/', get_proceso);

module.exports = router;