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

const get_AmbitoAcademico = async(req, res) => {

    try { 
         
        const selectAmbitoAcademico= await pool.query('SELECT * FROM ambito_academico');
      
        res.status(200).json(selectAmbitoAcademico.rows);

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get ambito_academico'
    }) 
    }

}

const post_get_AmbitoAcademico = async(req, res = response) => {

    
    try {
        
        const { nombre_ambito_academico} = req.body;
  

        const insertAmbitoAcademico = await pool.query('INSERT INTO ambito_academico ( nombre_ambito_academico) VALUES ($1)',[nombre_ambito_academico]);
        console.log(insertAmbitoAcademico);
        res.status(200).json({
            ok: true,
            message: ' Ambito Academico agregado exitosamente xd',
            body: {
                producto: {nombre_ambito_academico}
            }
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Registros'
    })

}}


const delete_get_AmbitoAcademico = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteUnidad = await pool.query('DELETE FROM ambito_academico WHERE id_ambito_academico = $1', [id]);
        console.log(deleteUnidad);
        res.status(200).json(`Ambito Academico ${id} borrada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Delete Ambito Academico'
    })
    }

};
  
const update_get_AmbitoAcademico= async (req, res) => {
   try {
       
       const {nombre_ambito_academico, estado_ambito_academico} = req.body;
       let id = await req.params.id;

       const updateAmbitoAcademico = await pool.query('update ambito_academico set nombre_ambito_academico=$1, estado_ambito_academico=$2 where id_ambito_academico=$3',
       [nombre_ambito_academico,
        estado_ambito_academico,         
        id ]);

       console.log(updateAmbitoAcademico);
       res.json('Ambito Academico actualizados exitosamente ');

   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Ambito Academico'
   })
}
}       

const getUserByIdget_AmbitoAcademico = async (req, res) => {

    try {
        
        const id =  req.params.id;
        const data = await pool.query('select * from ambito_academico WHERE nombre_ambito_academico = $1', [id]);
        res.status(200).json({
            ok: true,
            resultado: data.rows});  

 
    } catch (error) {
        console.log("El error es: ", error)
        res.status(400).json( {
            ok: false,
            msg: 'Error Search Get ambito academico'
        }) 

    }
}    

/* ###################################################################################################### */

module.exports = {

    get_AmbitoAcademico,
    post_get_AmbitoAcademico, 
    delete_get_AmbitoAcademico, 
    update_get_AmbitoAcademico,
    getUserByIdget_AmbitoAcademico
}