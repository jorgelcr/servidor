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

const get_unidad = async(req, res) => {
    try {
        //const selectUnidad= await pool.query('SELECT nombre_unidad from unidad');
        //const selectUnidad= await pool.query('SELECT * FROM usuarios INNER JOIN unidad ON usuarios.fk_id_unidad = unidad.id_unidad');
        const selectUnidad= await pool.query('SELECT id_unidad, nombre_unidad, fk_id_unidad FROM unidad INNER JOIN usuarios ON usuarios.fk_id_unidad = unidad.id_unidad');
        
        res.status(200).json(selectUnidad.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

module.exports = {
    get_unidad,
}