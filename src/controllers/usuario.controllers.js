const { Pool } = require('pg');
const {response} = require("express");
/* const { database } = require('pg/lib/defaults'); */

const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '1',
    database: 'evidencias'
}
const pool = new Pool (config);

const get_Rol = async(req, res) => {

    try {
        
        const selectRol= await pool.query('SELECT id_rol, nombre_rol FROM rol');
      
        res.status(200).json({
            ok: true,
            resultado: selectRol.rows});
  
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Rol'
    }) 
    }

} 

const get_unidad = async(req, res) => {

    try {
        
        const selectRol= await pool.query('SELECT id_unidad, nombre_unidad FROM unidad');
      
        res.status(200).json({
            ok: true,
            resultado: selectRol.rows});
  
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Unidad'
    }) 
    }

}

const post_Usuario = async(req, res = response) => {

    const {rut, nombres_usuario, apellidos_usuario, correo_usuario, contrasena,fk_id_rol, fk_id_unidad} = req.body;
    
    try {
        
        const insert_usuario = await pool.query('INSERT INTO usuarios ( rut, nombres_usuario, apellidos_usuario, correo_usuario, contrasena, fk_id_rol, fk_id_unidad) VALUES ($1, $2, $3, $4, $5, $6, $7)',[rut, nombres_usuario, apellidos_usuario, correo_usuario, contrasena, fk_id_rol, fk_id_unidad]);
        console.log(insert_usuario);
        res.status(200).json({
            ok: true,
            message: ' Usuario agregado exitosamente xd',
            body: {
                producto: {rut, nombres_usuario, apellidos_usuario, correo_usuario, contrasena, fk_id_rol, fk_id_unidad}
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json( { 
            ok: false,
            msg: 'Error Post Usuario'
    })

}}


module.exports = {

    get_Rol, get_unidad, post_Usuario
    
    }