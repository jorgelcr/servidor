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

const get_usuario = async(req, res) => {
    try {
        const selectUsuario= await pool.query('SELECT nombres_usuario, correo_usuario from usuarios');
        res.status(200).json(selectUsuario.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}



module.exports = {
    get_usuario,
}