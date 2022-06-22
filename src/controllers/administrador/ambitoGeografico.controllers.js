const { Pool } = require('pg');
const {response} = require("express");


const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '7551',
    database: 'evidencias'
}
const pool = new Pool (config);

const get_AmbitoGeografico = async(req, res) => {

    try { 
         
        const selectAmbitoGeografico= await pool.query('SELECT * FROM ambito_geografico');
      
        res.status(200).json(selectAmbitoGeografico.rows);

    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Ambito Geografico'
    }) 
    }

}

const post_AmbitoGeografico = async(req, res = response) => {

    
    try {
        
        const { nombre_ambito_geografico} = req.body;

        const insertAmbitoGeografico = await pool.query('INSERT INTO ambito_geografico ( nombre_ambito_geografico) VALUES ($1)',[nombre_ambito_geografico]);
        console.log(insertAmbitoGeografico);
        res.status(200).json({
            ok: true,
            message: ' Ambito Geografico agregado exitosamente xd',
            body: {
                producto: {nombre_ambito_geografico}
            }
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Ambito Geografico'
    })

}}


const delete_AmbitoGeografico = async (req, res) => {
    
    try {
        
        const id =  req.params.id;
        const deleteAmbitoGeografico = await pool.query('DELETE FROM ambito_geografico WHERE id_ambito_geografico = $1', [id]);
        console.log(deleteAmbitoGeografico);
        res.status(200).json(`Ambito Geografico ${id} borrada Satisfactoriamente`);
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Delete Ambito Geografico'
    })
    }

};
  
const update_AmbitoGeografico= async (req, res) => {  
   try {
       
       const {nombre_ambito_geografico, estado_ambito_geografico} = req.body;
       let id = await req.params.id;

       const update_AmbitoGeografico = await pool.query('update ambito_geografico set nombre_ambito_geografico=$1, estado_ambito_geografico=$2 where id_ambito_geografico=$3',
       [nombre_ambito_geografico,
        estado_ambito_geografico,     
        id ]);

       console.log(update_AmbitoGeografico);
       res.json('Ambito Geografico actualizado exitosamente ');

   } catch (error) {
       console.log("AAAAAAAAAAAA: ",error);
    res.status(400).json( {
        ok: true,
        msg: 'Error Get Ambito Geografico'
   })
}
}       

const getUserByIdAmbitoGeografico = async (req, res) => {

    try {
        
        const id =  req.params.id;
        const data = await pool.query('select * from ambito_geografico WHERE nombre_ambito_geografico = $1', [id]);
        res.status(200).json({
            resultado: data.rows});  
    
    } catch (error) {
        res.status(400).json({
            ok: false,
             message: 'Error al buscar Ambito Geografico',
        });  
    }
 
}
/* ###################################################################################################### */

module.exports = {

    get_AmbitoGeografico,
    post_AmbitoGeografico, 
    delete_AmbitoGeografico, 
    update_AmbitoGeografico,
    getUserByIdAmbitoGeografico
}