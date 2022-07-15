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

const get_Debilidad = async(req, res) => {

    try { 
         
        const selectDebilidades= await pool.query('SELECT id_debilidades, codigo_debilidades, nombre_debilidades, descripcion_debilidades, estado_debilidades, nombre_unidad, nombre_criterios, fk_id_unidad, fk_id_criterio FROM debilidades INNER JOIN unidad ON debilidades.fk_id_unidad = unidad.id_unidad INNER JOIN criterios ON debilidades.fk_id_criterio = criterios.id_criterios ');

        res.status(200).json(selectDebilidades.rows);

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Debilidades'
    }) 
    }

}

const post_Debilidad = async(req, res = response) => {

    
    try {
        
        const { codigo_debilidades, nombre_debilidades, descripcion_debilidades, estado_debilidades, fk_id_unidad, fk_id_criterio} = req.body;

        const insert_unidad = await pool.query('INSERT INTO debilidades ( codigo_debilidades, nombre_debilidades, descripcion_debilidades, estado_debilidades, fk_id_unidad, fk_id_criterio) VALUES ($1, $2, $3, $4, $5, $6)',[codigo_debilidades, nombre_debilidades, descripcion_debilidades, estado_debilidades, fk_id_unidad, fk_id_criterio]);
        console.log(insert_unidad);
        res.status(200).json({ 
            ok: true,   
            message: ' Debilidad agregado exitosamente xd',
            body: {
                producto: {codigo_debilidades, nombre_debilidades, descripcion_debilidades, estado_debilidades, fk_id_unidad, fk_id_criterio}
            }
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Debilidad debilidda'
    })

}}


const delete_Debilidad = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteUnidad = await pool.query('DELETE FROM debilidades WHERE id_debilidades = $1', [id]);
        console.log(deleteUnidad);
        res.status(200).json(`Debilidad ${id} borrada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Delete Debilidad'
    })
    }

};
  
const update_Debilidad= async (req, res) => {
   try {
       
       const {codigo_debilidades, nombre_debilidades, descripcion_debilidades, estado_debilidades} = req.body;
       let id = await req.params.id;

       const updateUnidad = await pool.query('update debilidades set codigo_debilidades=$1, nombre_debilidades=$2, descripcion_debilidades=$3, estado_debilidades=$4 where id_debilidades=$5',
       [codigo_debilidades, 
        nombre_debilidades, 
        descripcion_debilidades, 
        estado_debilidades,         
        id ]);

       console.log(updateUnidad);
       res.json('Debilidad actualizada exitosamente ');

   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Debilidad'
   })
}
}       

const getUserByIdDebilidad = async (req, res) => {

    try {
         
        const id =  req.params.id;
        const data = await pool.query('select * from debilidades WHERE codigo_debilidades = $1', [id]);
        res.status(200).json({
            resultado: data.rows});  
    
    } catch (error) {
        res.status(400).json({
            ok: false,
             message: 'Error al buscar por codigo en Debilidad',
        });  
    }
 
}

const getUnidadDebilidad = async(req, res) => {

    try { 
         
        const selectUnidad= await pool.query('SELECT * FROM unidad where unidad_defecto = true');
      
        res.status(200).json({
            ok: true,
            resultado: selectUnidad.rows});
    } catch (error) {
        console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQsdsds",error)
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Unidad de Debilidad'
    }) 
    } 
}

const get_CriterioDeblidad = async(req, res) => {

    try {
        
        const selectCriterio= await pool.query('SELECT * FROM criterios where estado_criterios = true');
       
        res.status(200).json({
            ok: false,
            msg      : "Criterio de Debilidad encontrado satisfactoriamente",
            resultado: selectCriterio.rows});

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio de  debilidad'
    }) 
    }

}
/* ###################################################################################################### */

module.exports = {

    get_Debilidad,
    post_Debilidad, 
    delete_Debilidad, 
    update_Debilidad,
    getUserByIdDebilidad,
    getUnidadDebilidad,
    get_CriterioDeblidad
}