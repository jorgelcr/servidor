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

const get_TipoRegistro = async(req, res) => {

    try { 
         
        const selectRegistros= await pool.query('SELECT * FROM registros');
      
        res.status(200).json(selectRegistros.rows);

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Registros'
    }) 
    }

}

const post_TipoRegistro = async(req, res = response) => {

    
    try {
        
        const { nombre_registros} = req.body;
  

        const insert_registros = await pool.query('INSERT INTO registros ( nombre_registros) VALUES ($1)',[nombre_registros]);
        console.log(insert_registros);
        res.status(200).json({
            ok: true,
            message: ' Registros agregado exitosamente xd',
            body: {
                producto: {nombre_registros}
            }
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Registros'
    })

}}


const delete_TipoRegistro = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteUnidad = await pool.query('DELETE FROM registros WHERE id_registros = $1', [id]);
        console.log(deleteUnidad);
        res.status(200).json(`Registros ${id} borrada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Delete Registros'
    })
    }

};
  
const update_TipoRegistro= async (req, res) => {
   try {
       
       const {nombre_registros, estado_registros} = req.body;
       let id = await req.params.id;

       const updateRegistros = await pool.query('update registros set nombre_registros=$1, estado_registros=$2 where id_registros=$3',
       [nombre_registros,
        estado_registros,         
        id ]);

       console.log(updateRegistros);
       res.json('Registros actualizados exitosamente ');

   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Registros'
   })
}
}       

const getUserByIdTipoRegistro = async (req, res) => {

    try {
        
        const id =  req.params.id;
        const data = await pool.query('select * from registros WHERE nombre_registros = $1', [id]);
        res.status(200).json({
            ok: true,
            resultado: data.rows});  

 
    } catch (error) {
        console.log("El error es: ", error)
        res.status(400).json( {
            ok: false,
            msg: 'Error Search Get Registros'
        }) 

    }
}    

/* ###################################################################################################### */

module.exports = {

    get_TipoRegistro,
    post_TipoRegistro, 
    delete_TipoRegistro, 
    update_TipoRegistro,
    getUserByIdTipoRegistro
}