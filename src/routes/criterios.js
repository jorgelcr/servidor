const Router = require('express');
const res = require('express/lib/response');
const router = Router();


const {get_Criterios, post_Criterios, delete_criterios, update_Criterios, getUserByIdCriterios} = require('../controllers/criterios.controllers');


router.get('/', get_Criterios);
router.post('/', post_Criterios);
router.delete('/:id', delete_criterios);
router.put('/:id', update_Criterios); 
router.get('/:id', getUserByIdCriterios);
module.exports = router;
