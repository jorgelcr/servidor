const Router = require('express');
const res = require('express/lib/response');
const router = Router();


const {get_Evidencias, post_Evidencias, delete_Evidencias, update_Evidencias, getByIdEvidencias} = require('../../controllers/usuario-normal/evidencias.controllers');
//const {get_CrearEvidencias} = require('../../controllers/usuario-normal/getcrearevidencias.controllers');


router.get('/', get_Evidencias);
//router.get('/', get_CrearEvidencias);
router.post('/', post_Evidencias);
router.delete('/:id', delete_Evidencias);
router.put('/:id', update_Evidencias); 
router.get('/:id', getByIdEvidencias);

module.exports = router;