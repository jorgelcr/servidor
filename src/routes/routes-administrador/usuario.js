const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const {get_Usuario, post_Usuario, delete_Usuario, update_Usuario, getUserByIdUsuario, getUnidadUsuario, getRolUsuario} = require('../../controllers/administrador/usuario.controllers');


router.get('/usuario', get_Usuario);
router.post('/', post_Usuario);
router.delete('/:id', delete_Usuario);
router.put('/:id', update_Usuario); 
router.get('/:id', getUserByIdUsuario);

router.get('/', getUnidadUsuario);
router.get('/rol/rol', getRolUsuario);
module.exports = router;   

    