const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let app = express();
let Categoria = require('../models/categoria');

//==============================
// Mostrar todas las categorias
//==============================

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        });
});

//==============================
// Mostrar una categoria por ID
//==============================

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id)
        .populate('usuario')
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El Id no es correcto'
                    }
                });
            }

            return res.json({
                ok: true,
                categoria: categoriaDB
            });
        });

    // Categoria.findById(id, (err, categoriaDB) => {

    //     if (err) {
    //         return res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!categoriaDB) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'El Id no es correcto'
    //             }
    //         });
    //     }

    //     return res.json({
    //         ok: true,
    //         categoria: categoriaDB
    //     });

    // });

});

//==============================
// Crea una categoria por ID
//==============================

app.post('/categoria', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//==============================
// Actualiza categoría
//==============================

app.put('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    let descripcion = req.body.descripcion;

    Categoria.findByIdAndUpdate(id, { descripcion }, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//==============================
// Aliminar categoría
//==============================
// solo puede ser borrada x un administrador y pedir el token, la eliminación debe ser fisica no logica

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no existe'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


module.exports = app;