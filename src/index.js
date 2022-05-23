// REQUERIMOS APP DESDE APP.JS PARA PONER EL SERVER EN ESCUCHA. -> PASAMOS A CREAR LAS RUTAS EN EL ROUTES FOLDER
const {APP} = require('./app');
require('./database');


APP.listen(3000);
console.log("SERVER ON PORT ", 3000);
