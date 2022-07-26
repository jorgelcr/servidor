const { Pool } = require('pg');
const {response} = require("express");


const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '7551',
    database: 'evidencias'
}
const pool = new Pool (config);


const login = async (req, res = response) => {
    const { correo_usuario, contrasena } = req.body
    console.log(correo_usuario+"-"+contrasena)
    try {
        const response = await pool.query('select login($1, $2)', [correo_usuario, contrasena]);
        const responses = await pool.query('select * from usuarios WHERE correo_usuario = $1 and contrasena = $2 and fk_id_rol = 3', [correo_usuario, contrasena])
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR", ( responses.rows.length >=1))  
        if (  responses.rows.length >=1 ){
 
            res.json({
                ok         :true,
                resultado  :response.rows,
                correo     : correo_usuario,
                contraseña : contrasena,
                elusuarioes:    responses.rows
            })
        }else{

            res.json({
                ok         :false,
/*                 resultado  :response.rows,
                correo     : correo_usuario,
                contraseña : contrasena, */
                //elusuarioes:    responses.rows
            })
        }
    }
    catch (err) {
        console.log("EL ERROR DEL LOGIN ES: ",err)
        res.json(err)
    }
}

module.exports = {

    login, 
}