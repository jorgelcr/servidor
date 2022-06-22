
const Router = require('express');
const res = require('express/lib/response');
const router = Router();


const {get_Debilidad, post_Debilidad, delete_Debilidad, update_Debilidad, getUserByIdDebilidad, getUnidadDebilidad, get_CriterioDeblidad} = require('../../controllers/administrador/debilidades.controllers');
   
router.get('/', get_Debilidad);
router.post('/', post_Debilidad);
router.delete('/:id', delete_Debilidad);
router.put('/:id', update_Debilidad); 
router.get('/:id', getUserByIdDebilidad);

router.get('/unidad/unidad', getUnidadDebilidad);
router.get('/criterio/criterio', get_CriterioDeblidad);
module.exports = router;







