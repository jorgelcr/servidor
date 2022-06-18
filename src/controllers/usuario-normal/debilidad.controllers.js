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

const get_debilidad = async(req, res) => {
    try {
        //const selectDebilidad= await pool.query('SELECT nombre_debilidades from debilidades');
        const selectDebilidad= await pool.query('SELECT id_debilidades, nombre_debilidades, fk_id_debilidades FROM debilidades INNER JOIN evidencias ON evidencias.fk_id_debilidades = debilidades.id_debilidades');
        res.status(200).json(selectDebilidad.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

module.exports = {
    get_debilidad,
}