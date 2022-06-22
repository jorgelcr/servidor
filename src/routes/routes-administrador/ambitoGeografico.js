const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const {get_AmbitoGeografico, post_AmbitoGeografico, delete_AmbitoGeografico, update_AmbitoGeografico, getUserByIdAmbitoGeografico} = require('../../controllers/administrador/ambitoGeografico.controllers');


router.get('/', get_AmbitoGeografico);
router.post('/', post_AmbitoGeografico);
router.delete('/:id', delete_AmbitoGeografico);
router.put('/:id', update_AmbitoGeografico); 
router.get('/:id', getUserByIdAmbitoGeografico); 
module.exports = router;

    