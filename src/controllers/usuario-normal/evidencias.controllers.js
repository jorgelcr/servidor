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
        //const selectCriterio= await pool.query('SELECT usuarios.nombres_usuario, unidad.nombre_unidad, registros.nombre_registros, ambito_academico.nombre_ambito_academico, criterios.nombre_criterios, procesos.nombre_procesos, debilidades.nombre_debilidades from evidencias evidencias inner join usuarios usuarios on usuarios.id_usuarios = evidencias.fk_id_usuario inner join unidad unidad on unidad.id_unidad = evidencias.fk_id_unidad inner join registros registros on registros.id_registros = evidencias.fk_id_registros inner join ambito_academico ambito_academico on ambito_academico.id_ambito_academico = evidencias.fk_id_ambito_academico inner join criterios criterios on criterios.id_criterios = evidencias.fk_id_criterios inner join procesos procesos on procesos.id_procesos = evidencias.fk_id_procesos inner join debilidades debilidades on debilidades.id_debilidades = evidencias.fk_id_debilidades');
      
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

    const { nombre_cliente, correo_usuario, fk_id_usuario, fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, fk_id_estado, fk_id_ambito_academico, fk_id_ambito_geografico, descripcion, resultado, almacenamiento, unidadpersonasevid, palabraclave, nomcortoevidencia} = req.body;
    
    try { 

        const insertEvidencia = await pool.query('INSERT INTO evidencias ( nombre_cliente, e_correo_usuario, fk_id_usuario, fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, fk_id_estado, fk_id_ambito_academico, fk_id_ambito_geografico, descripcion, resultado, almacenamiento, unidadpersonasevid, palabraclave, nomcortoevidencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
        [nombre_cliente, correo_usuario, fk_id_usuario, fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, fk_id_estado, fk_id_ambito_academico, fk_id_ambito_geografico, descripcion, resultado, almacenamiento, unidadpersonasevid, palabraclave, nomcortoevidencia]);
        console.log(insertEvidencia);
        res.status(200).json({
            ok: true,
            message: ' Evidencia agregado exitosamente.',
            body: {
                evidencia: {nombre_cliente, correo_usuario, fk_id_usuario, fk_id_debilidades, 
                    fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, 
                    fk_id_estado, fk_id_ambito_academico, fk_id_ambito_geografico, descripcion, resultado, 
                    almacenamiento, unidadpersonasevid, palabraclave, nomcortoevidencia }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Evidencia'
    })

}}


const delete_Evidencias = async (req, res) => {
    const id =  req.params.id;
    const deleteEvidencias = await pool.query('DELETE FROM evidencias WHERE id_evidencias = $1', [id]);
    console.log(deleteEvidencias);
    res.json(`Evidencias de id: ${id} borrada Satisfactoriamente`);

};

const update_Evidencias = async (req, res) => {
   try {
       
       const {fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, fk_id_estado, fk_id_ambito_academico, fk_id_ambito_geografico} = req.body;
       let id = await req.params.id;

       const updateEvidencias = await pool.query('update evidencias set fk_id_debilidades=$1, fk_id_unidad=$2, fk_id_criterios=$3, fk_id_registros=$4, fk_id_procesos=$5, fk_id_estado=$6, fk_id_ambito_academico=$7, fk_id_ambito_geografico=$8 where id_evidencias=$9',
       [fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, 
        fk_id_procesos, fk_id_estado, fk_id_ambito_academico, 
        fk_id_ambito_geografico, id]);
            /*        if (!id){
 
                res.status(404).json( { msg: 'No existe la Unidad'})
            } */
   
        

       console.log(updateEvidencias);
       res.json('Evidencias actualizado exitosamente ');
   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Evidencias'
   })
}
}





const getByIdEvidencias = async (req, res) => {

    try {
        
        const id =  req.params.id;
        const data = await pool.query('SELECT nombre_cliente, e_correo_usuario, fk_id_debilidades, fk_id_unidad, fk_id_criterios, fk_id_registros, fk_id_procesos, fk_id_estado, fk_id_ambito_academico, fk_id_ambito_geografico from evidencias WHERE id_evidencias = $1', [id]);
        res.status(200).json({
            ok: true,
            resultado: data.rows});  

 
    } catch (error) {
        console.log("El error es: ", error)
        res.status(400).json( {
            ok: false,
            msg: 'Error Search Get Evidencias'
        }) 

    }
}  



module.exports = {

get_Evidencias,
post_Evidencias,
delete_Evidencias,
update_Evidencias,
getByIdEvidencias,

}