const { Pool } = require('pg');
const {response} = require("express");
const { database } = require('pg/lib/defaults');

const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '1',
    database: 'evidencias'
}
const pool = new Pool (config);

const get_registro = async(req, res) => {
    try {
        //const selectRegistro= await pool.query('SELECT nombre_registros from registros');
        const selectRegistro= await pool.query('SELECT id_registros, nombre_registros, fk_id_registros FROM registros INNER JOIN evidencias ON evidencias.fk_id_registros = registros.id_registros where id_registros = id_registros');
        
        res.status(200).json(selectRegistro.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

module.exports = {
    get_registro,
}