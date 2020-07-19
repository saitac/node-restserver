require('./config/config');

const express = require('express');
const app = express();


// ¿bodyParser? $ npm install body-parser  // npm body-parser ,, ya incluido en express 4.16 hacia adelante
// Lección 80

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/usuario', (req, res) => {
    res.status(200).json('get usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.status(200).json({
            persona: body
        });
    }

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.status(200).json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.status(200).json('delete usuario');
});

app.listen(process.env.PORT, '', () => {
    console.log('Escuchando el puerto', process.env.PORT);
});