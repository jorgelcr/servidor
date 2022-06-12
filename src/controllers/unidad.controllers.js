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

const getUnidad = async(req, res) => {

    try {
        
        const selectUnidad= await pool.query('SELECT * FROM unidad');
      
        res.status(200).json(selectUnidad.rows);
    /*  res.status(200).json( {
         ok2: selectUnidad.rows, 
        ok: true,
        msg: 'get unidad'
    }) */
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Unidad'
    }) 
    }

}

const postUnidad = async(req, res = response) => {

    const { codigo_unidad, nombre_unidad} = req.body;
    
    try {
        
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
    const id =  req.params.id;
    const deleteUnidad = await pool.query('DELETE FROM unidad WHERE codigo_unidad = $1', [id]);
    console.log(deleteUnidad);
    res.json(`Unidad ${id} borrada Satisfactoriamente`);

};
  
const update_Unidad= async (req, res) => {
   try {
       
       const {codigo_unidad, nombre_unidad} = req.body;
       let id = await req.params.id;

       const updateUnidad = await pool.query('update unidad set codigo_unidad=$1, nombre_unidad=$2 where id_unidad=$3',
       [codigo_unidad,
        nombre_unidad,
        id ]);
 /*        if (!id){
 
         res.status(404).json( { msg: 'No existe la Unidad'})
     } */
   
        

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
    const id =  req.params.id;
    const data = await pool.query('select * from unidad WHERE id_unidad = $1', [id]);
    res.status(200).json(data.rows); 
};  


/* ###################################################################################################### */

module.exports = {

    getUnidad,
    postUnidad, 
    delete_Unidad, 
    update_Unidad,
    getUserByIdUnidad
}