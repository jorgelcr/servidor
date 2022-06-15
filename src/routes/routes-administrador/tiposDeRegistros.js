const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const {get_TipoRegistro, post_TipoRegistro, delete_TipoRegistro, update_TipoRegistro, getUserByIdTipoRegistro} = require('../../controllers/administrador/tiposDeRegistros.controllers');


router.get('/', get_TipoRegistro);
router.post('/', post_TipoRegistro);
router.delete('/:id', delete_TipoRegistro);
router.put('/:id', update_TipoRegistro); 
router.get('/:id', getUserByIdTipoRegistro); 
module.exports = router;

    
  