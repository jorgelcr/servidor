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

const get_criterio = async(req, res) => {
    try {
        //const selectCriterio= await pool.query('SELECT nombre_criterios from criterios');
        const selectCriterio= await pool.query('SELECT id_criterios, nombre_criterios, fk_id_criterios FROM criterios INNER JOIN evidencias ON evidencias.fk_id_criterios = criterios.id_criterios');
        res.status(200).json(selectCriterio.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

module.exports = {
    get_criterio,
}