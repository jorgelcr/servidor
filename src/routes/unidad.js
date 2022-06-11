const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const {getUnidad, postUnidad, delete_Unidad, update_Unidad, getUserByIdUnidad} = require('../controllers/unidad.controllers');


router.get('/', getUnidad);
router.post('/', postUnidad);
router.delete('/:id', delete_Unidad);
router.put('/:id', update_Unidad); 
router.get('/:id', getUserByIdUnidad);
module.exports = router;

    
  