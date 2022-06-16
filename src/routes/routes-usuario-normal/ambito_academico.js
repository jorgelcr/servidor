const Router = require('express');
const res = require('express/lib/response');
const router = Router();

const {get_ambitoacademico} = require('../../controllers/usuario-normal/ambito_academico.controllers');

router.get('/', get_ambitoacademico);

module.exports = router;