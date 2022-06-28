
const Router = require('express');
const res = require('express/lib/response');
const router = Router();


const {get_Evidencia, delete_evidencia, get_Evidencia_Id, update_EvidenciaDirector} = require('../../controllers/director/verEvidenciaDirector.controllers');
       


router.get('/Evidencias', get_Evidencia);
router.delete('/:id', delete_evidencia);
router.get('/:id', get_Evidencia_Id);
router.put('/:id', update_EvidenciaDirector);
module.exports = router;