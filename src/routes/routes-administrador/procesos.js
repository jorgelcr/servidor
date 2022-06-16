const Router = require('express');
const res = require('express/lib/response');
const router = Router();


const {get_Procesos, post_Procesos, delete_Procesos, update_Procesos, getUserByIdProcesos} = require('../../controllers/administrador/procesos.controllers');


router.get('/', get_Procesos);
router.post('/', post_Procesos);
router.delete('/:id', delete_Procesos);
router.put('/:id', update_Procesos); 
router.get('/:id', getUserByIdProcesos);

module.exports = router;
 