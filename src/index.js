/* la respuesta es irte a la carpeta raiz con 'cd /' luego hacer cd a 
"C:\Program Files\PostgreSQL\9.5\bin>" y ahi poner ".\psql -d nombre de la bd -U postgres -W"
 */

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
///Rutas
app.use('/api/unidad', require('./routes/routes-administrador/unidad.js'));
app.use('/api/criterio', require('./routes/routes-administrador/criterios.js'));
app.use('/api/proceso', require('./routes/routes-administrador/procesos.js'));
app.use('/api/tiporegistro', require('./routes/routes-administrador/tiposDeRegistros.js'));
app.use('/api/ambitoacademico', require('./routes/routes-administrador/AmbitoAcademico.js'));
app.use('/api/usuario', require('./routes/routes-administrador/usuario.js'));
app.use('/api/evidencias', require('./routes/routes-usuario-normal/evidencias.js')); 

app.use('/api/getcrearevidencias', require('./routes/routes-usuario-normal/getcrearevidencias.js'));
app.use('/api/getusuario', require('./routes/routes-usuario-normal/usuario.js'));
app.use('/api/getunidad', require('./routes/routes-usuario-normal/unidad.js'));
app.use('/api/getregistro', require('./routes/routes-usuario-normal/registro.js'));
app.use('/api/getambitoacademico', require('./routes/routes-usuario-normal/ambito_academico.js'));
app.use('/api/getcriterio', require('./routes/routes-usuario-normal/criterio.js'));
app.use('/api/getproceso', require('./routes/routes-usuario-normal/proceso.js'));
app.use('/api/getdebilidad', require('./routes/routes-usuario-normal/debilidad.js'));

app.listen(3000);
console.log('Hello world');