const { Pool } = require('pg');
const {response} = require("express");
/* const { database } = require('pg/lib/defaults'); */

const config = {
       
    user: 'postgres',
    host: 'localhost',
    password: '7551',
    database: 'evidencias'
}
const pool = new Pool (config);

const get_Procesos = async(req, res) => {

    try {
        
        const selectProcesos= await pool.query('SELECT * FROM procesos');
      
        res.status(200).json(selectProcesos.rows);
    /*  res.status(200).json( {
         ok2: selectUnidad.rows, 
        ok: true,
        msg: 'get unidad'
    }) */
    } catch (error) {
          res.status(400).json( {
        ok: true,
        msg: 'Error Get Procesos'
    }) 
    }

}

const post_Procesos = async(req, res = response) => {

    const { codigo_procesos, nombre_procesos, estado_procesos} = req.body;
    
    try { 

        const insertProcesos = await pool.query('INSERT INTO procesos ( codigo_procesos, nombre_procesos, estado_procesos) VALUES ($1, $2, $3)',
        [codigo_procesos, nombre_procesos, estado_procesos]);
        console.log(insertProcesos);
        res.status(200).json({
            ok: true,
            message: ' Producto agregado exitosamente xd',
            body: {
                producto: {codigo_procesos,
                           nombre_procesos,
                           estado_procesos }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json( {
            ok: true,
            msg: 'Error Post Procesos'
    })

}}


const delete_Procesos = async (req, res) => {
    const id =  req.params.id;
    const deleteProcesos = await pool.query('DELETE FROM procesos WHERE codigo_procesos = $1', [id]);
    console.log(deleteProcesos);
    res.json(`Procesos ${id} borrada Satisfactoriamente`);

};

const getUserByIdProcesos = async (req, res) => {
    const id =  req.params.id;
    let data = [];
     data = await pool.query('select * from procesos WHERE codigo_procesos = $1', [id]);
    res.status(200).json({
        ok: true,
        resultado: data.rows
    }); 
};

const update_Procesos= async (req, res) => {
    try {
        
        const {codigo_procesos, nombre_procesos, estado_procesos} = req.body;
        let id = await req.params.id;
 
        const updateCriterio = await pool.query('update procesos set codigo_procesos=$1, nombre_procesos=$2, estado_procesos=$3 where id_procesos=$4',
        [codigo_procesos,
         nombre_procesos,
         estado_procesos,         
         id ]);
 
        console.log(updateCriterio);
        res.json('Procesos actualizado exitosamente ');
 
    } catch (error) {
        console.log("Error Procesos: ",error);
     res.status(400).json( {
         ok: true,
         msg: 'Error Update Proceso'
    })
 }
 }     

module.exports = {

get_Procesos,
post_Procesos,
delete_Procesos,
getUserByIdProcesos,
update_Procesos,

}