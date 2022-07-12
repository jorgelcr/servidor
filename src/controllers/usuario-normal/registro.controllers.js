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

const get_registro = async(req, res) => {
    try {
        //const selectRegistro= await pool.query('SELECT nombre_registros from registros');
        //const selectRegistro= await pool.query('SELECT id_registros, nombre_registros, fk_id_registros FROM evidencias INNER JOIN usuarios ON evidencias.fk_id_usuario = usuarios.id_usuarios INNER JOIN registros ON evidencias.fk_id_registros = registros.id_registros');
        const selectRegistro= await pool.query('SELECT id_registros, nombre_registros FROM registros');
        //const selectRegistro= await pool.query('SELECT id_registros, nombre_registros, fk_id_registros FROM registros INNER JOIN evidencias ON evidencias.fk_id_registros = registros.id_registros where id_registros = id_registros');
        res.status(200).json(selectRegistro.rows);
    } catch (error) {
        console.log(error)
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}


const getUserByIdRegistros = async (req, res) => {

    try {
        
        const id =  req.params.id;
        const data = await pool.query('SELECT id_registros, nombre_registros, fk_id_registros FROM evidencias INNER JOIN usuarios ON evidencias.fk_id_usuario = usuarios.id_usuarios INNER JOIN registros ON evidencias.fk_id_registros = registros.id_registros WHERE fk_id_usuario = $1', [id]);
        res.status(200).json({
            resultado: data.rows});  
    
    } catch (error) {
        res.status(400).json({
            ok: false,
             message: 'Error al buscar por id Registros de Evidencias',
        });  
    }
 
}
module.exports = {
    get_registro,
    getUserByIdRegistros
}