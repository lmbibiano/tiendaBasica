import { Router } from 'express';
import pool from '../database/config.js';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware para manejar la carga de archivos
router.use(fileUpload());
router.use(fileUpload({ createParentPath: true }));

router.get('/', async (req, res) => {
    res.render('adminproductos', { 
        title: 'adminproductos' 
    });
});

router.post('/', async (req, res) => {
    try {
        let { categoria, marca, modelo, descripcion, stock, precio } = req.body;
        let foto = req.files?.foto;

        console.log('Datos recibidos:', req.body);
        console.log('Archivos recibidos:', req.files);

        if (!categoria || !marca || !modelo || !descripcion || !stock || !precio) {
            return res.status(400).json({
                message: 'Debe proporcionar todos los datos.',
            });
        }

        let imagen;
        if (foto) {
            imagen = `img-${uuid().slice(0, 4)}-${foto.name}`;
            let uploadPath = path.join(__dirname, 'public/img/' + imagen);

            foto.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error al guardar la imagen' });
                }
            });
        } else {
            imagen = 'public/img/perfil/default.jpg';
        }

        // Iniciamos una transacción
        await pool.query('BEGIN');

        // Insertar o encontrar categoría
        let categoriaId;
        let categoriaResult = await pool.query(
            'SELECT id FROM tipo_producto WHERE nombre = $1',
            [categoria]
        );

        if (categoriaResult.rows.length > 0) {
            categoriaId = categoriaResult.rows[0].id;
        } else {
            let insertCategoriaResult = await pool.query(
                'INSERT INTO tipo_producto (nombre) VALUES ($1) RETURNING id',
                [categoria]
            );
            categoriaId = insertCategoriaResult.rows[0].id;
        }

        // Insertar o encontrar marca
        let marcaId;
        let marcaResult = await pool.query(
            'SELECT id FROM marca WHERE nombre = $1',
            [marca]
        );

        if (marcaResult.rows.length > 0) {
            marcaId = marcaResult.rows[0].id;
        } else {
            let insertMarcaResult = await pool.query(
                'INSERT INTO marca (nombre) VALUES ($1) RETURNING id',
                [marca]
            );
            marcaId = insertMarcaResult.rows[0].id;
        }

        // Inserción en la tabla de productos
        let { rows } = await pool.query(
            'INSERT INTO modelo (categoria_id, marca_id, nombre, descripcion, stock, precio, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            [categoriaId, marcaId, modelo, descripcion, stock, precio, imagen]
        );
        let productoId = rows[0].id;

        // Confirmamos la transacción
        await pool.query('COMMIT');

        res.status(201).json({
            message: 'Producto registrado correctamente',
            productoId: productoId
        });
    } catch (error) {
        // En caso de error, deshacemos los cambios
        await pool.query('ROLLBACK');
        console.log(error);
        res.status(500).json({ error: 'Error al registrar el producto' });
    }
});




export default router;
