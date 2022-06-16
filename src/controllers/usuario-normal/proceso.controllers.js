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

const get_proceso = async(req, res) => {
    try {
        const selectProceso= await pool.query('SELECT nombre_procesos from procesos');
        res.status(200).json(selectProceso.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

module.exports = {
    get_proceso,
}