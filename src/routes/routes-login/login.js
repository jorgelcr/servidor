const Router = require('express');
/* const res = require('express/lib/response'); */
const router = Router();


const { login } = require('../../controllers/login/login.controllers');


router.post('/', login);

module.exports = router;

    
  