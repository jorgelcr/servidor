const { Pool } = require('pg');
const {response} = require("express");


const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '7551',
    database: 'evidencias'
}
const pool = new Pool (config);


const get_Evidencia_Responsable = async(req, res) => {

    try {  
         
        const selectEvidenciasResponsable= await pool.query('SELECT id_evidencias, usuarios.fk_id_rol, nombre_procesos,nombre_debilidades, nombre_registros, numero_folio, nombre_criterios, evidencias.fk_id_unidad as evidenciasdelaunidad, usuarios.fk_id_unidad as UNIDADDELUSUARIO, usuarios.nombres_usuario, usuarios.id_usuarios, estado_evidencia_responsable, estado_evidencia_dac, revisado_reponsable, revisado_dac FROM evidencias INNER JOIN procesos ON evidencias.fk_id_procesos = procesos.id_procesos INNER JOIN registros ON evidencias.fk_id_registros = registros.id_registros INNER JOIN debilidades ON evidencias.fk_id_debilidades = debilidades.id_debilidades INNER JOIN criterios ON evidencias.fk_id_criterios = criterios.id_criterios INNER JOIN unidad ON evidencias.fk_id_unidad = unidad.id_unidad INNER JOIN usuarios ON usuarios.fk_id_unidad = unidad.id_unidad where usuarios.fk_id_rol = 3');

        res.status(200).json(selectEvidenciasResponsable.rows);

    } catch (error) {
        console.log("EL ERROR ES: ",error)
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Todas Evidencias '
    }) 
    }

}

const get_Evidencia_Id = async (req, res) => {
    const id =  req.params.id;
    const data = await pool.query('select * FROM evidencias INNER JOIN procesos ON evidencias.fk_id_procesos = procesos.id_procesos INNER JOIN registros ON evidencias.fk_id_registros = registros.id_registros INNER JOIN debilidades ON evidencias.fk_id_debilidades = debilidades.id_debilidades INNER JOIN criterios ON evidencias.fk_id_criterios = criterios.id_criterios INNER JOIN estados ON evidencias.fk_id_estado = estados.id_estados INNER JOIN ambito_geografico ON evidencias.fk_id_ambito_geografico = ambito_geografico.id_ambito_geografico INNER JOIN ambito_academico ON evidencias.fk_id_ambito_academico  = ambito_academico.id_ambito_academico INNER JOIN unidad ON evidencias.fk_id_unidad  = unidad.id_unidad JOIN usuarios ON evidencias.fk_id_usuario = usuarios.id_usuarios INNER JOIN rol ON usuarios.fk_id_rol = rol.id_rol WHERE numero_folio = $1', [id]);
    res.status(200).json(data.rows);  
};  


module.exports = {

    get_Evidencia_Responsable,
    get_Evidencia_Id,
  

}