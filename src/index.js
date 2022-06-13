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
app.use('/api/unidad', require('./routes/unidad.js'));
app.use('/api/criterio', require('./routes/criterios.js'));
app.use('/api/usuario', require('./routes/usuario.js'));
app.use('/api/evidencias', require('./routes/evidencias.js'));
app.listen(3000);
console.log('Hello world');