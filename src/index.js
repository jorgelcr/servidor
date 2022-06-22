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
app.use('/api/debilidad', require('./routes/routes-administrador/debilidad.js'));
app.use('/api/ambitogeografico', require('./routes/routes-administrador/ambitoGeografico.js'));


app.use('/api/evidencias', require('./routes/routes-usuario-normal/evidencias.js')); 
app.use('/api/evidencias', require('./routes/routes-usuario-normal/evidencias.js'));
app.use('/api/getcrearevidencias', require('./routes/routes-usuario-normal/getcrearevidencias.js'));

app.listen(3000);
console.log('Hello world');