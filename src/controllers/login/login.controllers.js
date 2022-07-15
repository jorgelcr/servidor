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
        res.json({
            ok         :true,
            resultado  :response.rows,
            correo     : correo_usuario,
            contraseña : contrasena
        })
    }
    catch (err) {
        res.json(err)
    }
}

module.exports = {

    login, 
}