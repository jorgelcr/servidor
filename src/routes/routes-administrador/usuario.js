const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const {get_Rol, get_unidad, post_Usuario} = require('../../controllers/administrador/usuario.controllers');


router.get('/rol/', get_Rol);
router.get('/unidad/', get_unidad);
router.post('/', post_Usuario);
module.exports = router;

    
  