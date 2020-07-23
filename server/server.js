require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// ¿bodyParser? $ npm install body-parser  // npm body-parser ,, ya incluido en express 4.16 hacia adelante
// Lección 80
// app.use('/usuario', require('./routes/usuario'));


// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/usuario'));


// mongodb+srv://saitac:ZGjRpsVi3zERBlxM@cluster0.ovmog.mongodb.net/cafe

// Conectar a Base de Datos, Puerto: 27017
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (error) => {

    if (error) throw error;
    console.log('Base de datos ONLINE!');

}).catch(error => console.log('Error!!', error));
// .then(console.log('ok'))


app.listen(process.env.PORT, '', () => {
    console.log('Escuchando el puerto', process.env.PORT);
});