const Router = require('express');
const res = require('express/lib/response');
const router = Router();


const {get_Evidencias, post_Evidencias, delete_Evidencias, update_Evidencias, getUserByIdEvidencias} = require('../controllers/evidencias.controllers');


router.get('/', get_Evidencias);
router.post('/', post_Evidencias);
router.delete('/:id', delete_Evidencias);
router.put('/:id', update_Evidencias); 
router.get('/:id', getUserByIdEvidencias);
module.exports = router;