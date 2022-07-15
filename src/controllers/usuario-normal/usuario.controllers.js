const { Pool } = require('pg');
const {response} = require("express");
const { database } = require('pg/lib/defaults');

const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '7551',
    database: 'evidencias'
}
const pool = new Pool (config);

const get_usuario1 = async(req, res) => {
    try {
        const selectUsuario= await pool.query('SELECT id_usuarios, nombres_usuario, correo_usuario from usuarios where correo_usuario =');
        res.status(200).json(selectUsuario.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

///

const get_usuario = async (req, res) => {

    try {
        
        const correo =  req.params.correo;
        const pass =  req.params.pass;
        const data = await pool.query('SELECT id_usuarios, nombres_usuario, correo_usuario from usuarios WHERE correo_usuario = $1 and contrasena = $2', [correo,pass]);
        res.status(200).json({
            resultado: data.rows});  
    
    } catch (error) {
        res.status(400).json({
            ok: false,
             message: 'Error, correo o pass incorrecto!',
        });  
    }
 
}



module.exports = {
    get_usuario,
}