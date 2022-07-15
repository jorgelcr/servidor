
const Router = require('express');
const router = Router();


const { get_Evidencia_Director, delete_Mi_evidencia_director } = require('../../controllers/director/misEvidenciasDirector.controllers');
       

router.get('/Evidencias/', get_Evidencia_Director);
router.delete('/:id', delete_Mi_evidencia_director);

module.exports = router;