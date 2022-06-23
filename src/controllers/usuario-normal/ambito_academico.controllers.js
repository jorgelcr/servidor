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

const get_ambitoacademico = async(req, res) => {
    try {
        //const selectAmbitoAcademico= await pool.query('SELECT nombre_ambito_academico from ambito_academico');
        const selectAmbitoAcademico= await pool.query('SELECT id_ambito_academico, nombre_ambito_academico FROM ambito_academico');
        res.status(200).json(selectAmbitoAcademico.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}

module.exports = {
    get_ambitoacademico,
}