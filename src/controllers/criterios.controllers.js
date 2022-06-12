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

const get_Criterios = async(req, res) => {

    try {
        
        const selectCriterio= await pool.query('SELECT * FROM criterios');
      
        res.status(200).json(selectCriterio.rows);
    /*  res.status(200).json( {
         ok2: selectUnidad.rows, 
        ok: true,
        msg: 'get unidad'
    }) */
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }

}

const post_Criterios = async(req, res = response) => {

    const { codigo_criterios, nombre_criterios, descripcion_criterios} = req.body;
    
    try { 

        const insertCriterio = await pool.query('INSERT INTO criterios ( codigo_criterios, nombre_criterios, descripcion_criterios) VALUES ($1, $2, $3)',
        [codigo_criterios, nombre_criterios, descripcion_criterios]);
        console.log(insertCriterio);
        res.status(200).json({
            ok: true,
            message: ' Producto agregado exitosamente xd',
            body: {
                producto: {codigo_criterios,
                           descripcion_criterios,
                           nombre_criterios }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Criterios'
    })

}}


const delete_criterios = async (req, res) => {
    const id =  req.params.id;
    const deleteCriterio = await pool.query('DELETE FROM criterios WHERE codigo_criterios = $1', [id]);
    console.log(deleteCriterio);
    res.json(`Criterios ${id} borrada Satisfactoriamente`);

};

const update_Criterios= async (req, res) => {
   try {
       
       const {codigo_criterios, nombre_criterios, descripcion_criterios} = req.body;
       let id = await req.params.id;

       const updateCriterio = await pool.query('update criterios set codigo_criterio=$1, descripcion_criterio=$2 where id_criterios=$3',
       [codigo_criterios,
        nombre_criterios,
        descripcion_criterios,
        id ]);
 /*        if (!id){
 
         res.status(404).json( { msg: 'No existe la Unidad'})
     } */
   
        

       console.log(updateCriterio);
       res.json('Criterios actualizado exitosamente ');
   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterios'
   })
}
}

const getUserByIdCriterios = async (req, res) => {
    const id =  req.params.id;
    let data = [];
     data = await pool.query('select * from criterios WHERE codigo_criterios = $1', [id]);
    res.status(200).json({
        ok: true,
        resultados: data.rows
    }); 
};

module.exports = {

get_Criterios,
post_Criterios,
delete_criterios,
update_Criterios,
getUserByIdCriterios,

}