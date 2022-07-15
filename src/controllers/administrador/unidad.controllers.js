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

const getUnidad = async(req, res) => {

    try { 
         
        const selectUnidad= await pool.query('SELECT * FROM unidad');
      
        res.status(200).json(selectUnidad.rows);

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Unidad'
    }) 
    }

}

const postUnidad = async(req, res = response) => {

    
    try {
        
        const { codigo_unidad, nombre_unidad} = req.body;

        if (!codigo_unidad){
            res.status(403)
            res.send( {msg: 'Error Codigo Unidad Vacio'
        })
    
        }//TODO:ss

        const insert_unidad = await pool.query('INSERT INTO unidad ( codigo_unidad, nombre_unidad) VALUES ($1, $2)',[codigo_unidad, nombre_unidad]);
        console.log(insert_unidad);
        res.status(200).json({
            ok: true,
            message: ' Producto agregado exitosamente xd',
            body: {
                producto: {codigo_unidad, nombre_unidad}
            }
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Unidad'
    })

}}


const delete_Unidad = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteUnidad = await pool.query('DELETE FROM unidad WHERE codigo_unidad = $1', [id]);
        console.log(deleteUnidad);
        res.status(200).json(`Unidad ${id} borrada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Delete Unidad'
    })
    }

};
  
const update_Unidad= async (req, res) => {
   try {
       
       const {codigo_unidad, nombre_unidad, unidad_defecto} = req.body;
       let id = await req.params.id;

       const updateUnidad = await pool.query('update unidad set codigo_unidad=$1, nombre_unidad=$2, unidad_defecto=$3 where id_unidad=$4',
       [codigo_unidad,
        nombre_unidad,
        unidad_defecto,          
        id ]);

       console.log(updateUnidad);
       res.json('Producto actualizado exitosamente ');

   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Unidad'
   })
}
}       

const getUserByIdUnidad = async (req, res) => {

    try {
        
        const id =  req.params.id;
        const data = await pool.query('select * from unidad WHERE codigo_unidad = $1', [id]);
        res.status(200).json({
            resultado: data.rows});  
    
    } catch (error) {
        res.status(400).json({
            ok: false,
             message: 'Error al buscar por codigo en UNIDAD DEL USUARIO',
        });  
    }
 
}
/* ###################################################################################################### */

module.exports = {

    getUnidad,
    postUnidad, 
    delete_Unidad, 
    update_Unidad,
    getUserByIdUnidad
}