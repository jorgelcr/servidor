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

const get_Evidencias = async(req, res) => {

    try {
        
        //const selectCriterio= await pool.query('SELECT * FROM evidencias');
        const selectCriterio= await pool.query('SELECT evidencias.id_evidencias, unidad.nombre_unidad, procesos.nombre_procesos, registros.nombre_registros, ambito_academico.nombre_ambito_academico, estados.id_estados from evidencias  evidencias inner join unidad unidad on unidad.id_unidad = evidencias.fk_id_unidad inner join procesos procesos on procesos.id_procesos = evidencias.fk_id_procesos inner join registros registros on registros.id_registros = evidencias.fk_id_registros inner join ambito_academico ambito_academico on ambito_academico.id_ambito_academico = evidencias.fk_id_ambito_academico inner join estados estados on estados.id_estados = evidencias.fk_id_estado');
      
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



const post_Evidencias = async(req, res = response) => {

    const { codigo_criterios, nombre_criterios, descripcion_criterios} = req.body;
    
    try { 

        const insertCriterio = await pool.query('INSERT INTO evidencias ( nombre_cliente, fk_id_usuario, fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, fk_id_estado, fk_id_ambito_academico) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
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


const delete_Evidencias = async (req, res) => {
    const id =  req.params.id;
    const deleteCriterio = await pool.query('DELETE FROM evidencias WHERE id_evidencias = $1', [id]);
    console.log(deleteCriterio);
    res.json(`Criterios ${id} borrada Satisfactoriamente`);

};

const update_Evidencias = async (req, res) => {
   try {
       
       const {codigo_criterios, nombre_criterios, descripcion_criterios} = req.body;
       let id = await req.params.id;

       const updateCriterio = await pool.query('update evidencias set codigo_criterio=$1, descripcion_criterio=$2 where id_criterios=$3',
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

const getUserByIdEvidencias = async (req, res) => {
    const id =  req.params.id;
    let data = [];
     data = await pool.query('select * from evidencias WHERE id_evidencias = $1', [id]);
    res.status(200).json({
        ok: true,
        resultados: data.rows
    }); 
};

module.exports = {

get_Evidencias,
post_Evidencias,
delete_Evidencias,
update_Evidencias,
getUserByIdEvidencias,

}