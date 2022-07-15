const { Pool } = require('pg');
const {response} = require("express");


const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '7551',
    database: 'evidencias'
}
const pool = new Pool (config);


const get_Evidencia_Director = async(req, res) => {

    try {  
         
        const selectEvidenciasDirector= await pool.query('SELECT * FROM evidencias INNER JOIN procesos ON evidencias.fk_id_procesos = procesos.id_procesos INNER JOIN registros ON evidencias.fk_id_registros = registros.id_registros INNER JOIN estados ON evidencias.fk_id_estado = estados.id_estados INNER JOIN usuarios ON evidencias.fk_id_usuario = usuarios.id_usuarios INNER JOIN rol ON usuarios.fk_id_rol = rol.id_rol INNER JOIN ambito_academico ON evidencias.fk_id_ambito_academico = ambito_academico.id_ambito_academico INNER JOIN unidad ON evidencias.fk_id_unidad = unidad.id_unidad where id_rol = 5 and id_usuarios = 64 ');
     
        res.status(200).json(selectEvidenciasDirector.rows);

    } catch (error) {
        console.log("EL ERROR ES: ",error)
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Todas Evidencias '
    }) 
    }

}

const delete_Mi_evidencia_director = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteUsuario = await pool.query('DELETE FROM evidencias USING usuarios, rol WHERE evidencias.fk_id_usuario = usuarios.id_usuarios and usuarios.fk_id_rol = rol.id_rol and id_evidencias = $1 and id_rol = 5 ', [id]);
        console.log(deleteUsuario);
        res.status(200).json(`Evidencia ${id} borrada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: false,
            msg: 'Error Delete Evidencia del Director'
    })
    }

};

module.exports = {

get_Evidencia_Director,
delete_Mi_evidencia_director

}