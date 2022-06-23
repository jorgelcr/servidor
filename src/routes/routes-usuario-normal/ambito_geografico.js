const Router = require('express');
//const res = require('express/lib/response');
const router = Router();


const {get_AmbitoGeografico} = require('../../controllers/usuario-normal/ambito_geografico.controllers');


router.get('/geografico', get_AmbitoGeografico); 
module.exports = router;