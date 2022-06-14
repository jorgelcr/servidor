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
<<<<<<< HEAD
app.use('/api/unidad', require('./routes/routes-administrador/unidad.js'));
app.use('/api/criterio', require('./routes/routes-administrador/criterios.js'));
app.use('/api/proceso', require('./routes/routes-administrador/procesos.js'));
app.use('/api/usuario', require('./routes/routes-administrador/usuario.js'));
=======
app.use('/api/unidad', require('./routes/unidad.js'));
app.use('/api/criterio', require('./routes/criterios.js'));
app.use('/api/usuario', require('./routes/usuario.js'));
app.use('/api/evidencias', require('./routes/evidencias.js'));
>>>>>>> 1729179b2d462039d93fe44a44de80b3171532ac
app.listen(3000);
console.log('Hello world');