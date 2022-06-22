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

const get_Usuario = async(req, res) => {

    try { 
         
        const selectUsuarios= await pool.query('SELECT * FROM usuarios INNER JOIN unidad ON usuarios.fk_id_unidad = unidad.id_unidad');
      
        res.status(200).json(selectUsuarios.rows);

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Usuarios'
    }) 
    }

}

const post_Usuario= async(req, res = response) => {

    
    try {
        
        const { rut , nombres_usuario, apellidos_usuario, correo_usuario, contrasena, estado, fk_id_rol, fk_id_unidad} = req.body;

 
        const insertUsuario = await pool.query('INSERT INTO usuarios (rut , nombres_usuario, apellidos_usuario, correo_usuario, contrasena, estado, fk_id_rol, fk_id_unidad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[ rut , nombres_usuario, apellidos_usuario, correo_usuario, contrasena, estado, fk_id_rol, fk_id_unidad]);
        console.log(insertUsuario);
        res.status(200).json({
            ok: true,
            message: ' Usuario agregado exitosamente xd',
            body: {
                producto: {rut, nombres_usuario, apellidos_usuario, correo_usuario, contrasena, estado, fk_id_rol, fk_id_unidad}
            }
        })   
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Usuario'
    })
 
}}


const delete_Usuario = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteUsuario = await pool.query('DELETE FROM usuarios WHERE rut = $1', [id]);
        console.log(deleteUsuario);
        res.status(200).json(`Usuario ${id} borrado Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Delete Usuario'
    })
    }

};
  
const update_Usuario= async (req, res) => {
   try {
       
       const {rut , nombres_usuario, apellidos_usuario, correo_usuario, contrasena, estado, fk_id_rol, fk_id_unidad} = req.body;
       let id = await req.params.id;

       const updateusuario = await pool.query('update usuarios set rut=$1, nombres_usuario=$2, apellidos_usuario=$3, correo_usuario=$4, contrasena=$5, estado=$6 , fk_id_rol=$7, fk_id_unidad=$8 where id_usuarios=$9',
       [rut,
        nombres_usuario,
        apellidos_usuario,       
        correo_usuario,
        contrasena,
        estado, 
        fk_id_rol, 
        fk_id_unidad,    
        id ]);

       console.log(updateusuario);
       res.json('Usuario actualizado exitosamente ');

   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Usuario'
   })
}
}       

const getUserByIdUsuario = async (req, res) => {
    const id =  req.params.id;
    const data = await pool.query('select * from usuarios INNER JOIN unidad ON usuarios.fk_id_unidad = unidad.id_unidad WHERE id_usuarios = $1', [id]);
    res.status(200).json({
        resultado: data.rows});  
};  
  
const getUnidadUsuario = async(req, res) => {

    try { 
         
        const selectUnidad= await pool.query('SELECT * FROM unidad ');
      /* where unidad_defecto = false */
        res.status(200).json({
            ok: true,
            resultado: selectUnidad.rows});
    } catch (error) {
        console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQsdsds",error)
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Unidad'
    }) 
    } 
}
   

const getRolUsuario = async(req, res) => {

    try { 
         
        const selectUnidad= await pool.query('SELECT * FROM rol');
      
        res.status(200).json({
            ok: true,
            resultado: selectUnidad.rows});
    } catch (error) {
        console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQsdsds",error)
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Rol'
    }) 
    } 
}

/* ###################################################################################################### */

module.exports = {

    get_Usuario,
    post_Usuario, 
    delete_Usuario, 
    update_Usuario,
    getUserByIdUsuario,
    getUnidadUsuario,
    getRolUsuario
} 