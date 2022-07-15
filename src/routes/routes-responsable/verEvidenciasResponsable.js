
const Router = require('express');
const router = Router();


const {get_Evidencia_Responsable} = require('../../controllers/responsable/verEvidenciaResponsable.controllers');
       


router.get('/', get_Evidencia_Responsable);
/* router.delete('/:id', delete_evidencia); */

module.exports = router;