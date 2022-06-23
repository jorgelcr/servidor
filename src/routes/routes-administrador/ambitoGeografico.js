const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const {get_AmbitoGeografico} = require('../../controllers/administrador/ambitoGeografico.controllers');


router.get('/', get_AmbitoGeografico); 
module.exports = router;

    