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

const get_CrearEvidencias = async(req, res) => {
    try {
        const selectEvidencia= await pool.query('SELECT usuarios.nombres_usuario, unidad.nombre_unidad, registros.nombre_registros, ambito_academico.nombre_ambito_academico, criterios.nombre_criterios, usuarios.correo_usuario, procesos.nombre_procesos, debilidades.nombre_debilidades from evidencias evidencias inner join usuarios usuarios on usuarios.id_usuarios = evidencias.fk_id_usuario inner join unidad unidad on unidad.id_unidad = evidencias.fk_id_unidad inner join registros registros on registros.id_registros = evidencias.fk_id_registros inner join ambito_academico ambito_academico on ambito_academico.id_ambito_academico = evidencias.fk_id_ambito_academico inner join criterios criterios on criterios.id_criterios = evidencias.fk_id_criterios inner join procesos procesos on procesos.id_procesos = evidencias.fk_id_procesos inner join debilidades debilidades on debilidades.id_debilidades = evidencias.fk_id_debilidades');
        res.status(200).json(selectEvidencia.rows);
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Criterio'
    }) 
    }
}



module.exports = {
    get_CrearEvidencias,
}

