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

const get_AmbitoGeografico = async(req, res) => {
    try {
        //const selectAmbitoAcademico= await pool.query('SELECT nombre_ambito_academico from ambito_academico');
        const selectAmbitoGeografico= await pool.query('SELECT id_ambito_geografico, nombre_ambito_geografico FROM ambito_geografico');
        res.status(200).json(selectAmbitoGeografico.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Geografico'
    }) 
    }
}

module.exports = {
    get_AmbitoGeografico,
}