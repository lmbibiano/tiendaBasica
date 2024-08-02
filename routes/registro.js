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
// router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    res.render('registro', { 
        title: 'Registro' });
});

router.post('/', async (req, res) => {
    try {
        let { nombre, apellido, email, rut, password, telefono, calle, numero_casa, comuna, region, pais } = req.body;
        let foto = req.files;

        console.log('Datos recibidos:', req.body);
        console.log('Archivos recibidos:', req.files);

        if (!nombre || !apellido || !email || !rut || !password || !telefono || !calle || !numero_casa || !comuna || !region || !pais ) {
            return res.status(400).json({
                message: 'Debe proporcionar todos los datos.',
            });
        }
        let imagen;
        if (foto) {
            imagen = `img-${uuid().slice(0, 4)}-${foto}`;
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

        // let imagen = `img-${uuid().slice(0, 4)}-${foto}`;
        // let uploadPath = path.join(__dirname, 'public/img/' + imagen);


        // Iniciamos una transacción
        await pool.query('BEGIN');

        // Insertamos en la tabla de usuarios y obtenemos el ID generado
        let { rows } = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, email, rut, password, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [nombre, apellido, email, rut, password, telefono]
        );
        let  usuarioId = rows[0].id;

        // Insertamos en la tabla de direcciones, utilizando el ID del usuario
        await pool.query(
            'INSERT INTO direccion (calle, numero_casa, comuna, region, pais, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [calle, numero_casa, comuna, region, pais, usuarioId]
        );
        // Guardamos la imagen en el servidor
                
        // foto.mv(uploadPath, (err) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).json({ error: 'Error al guardar la imagen' });
        //     }
        // });

        // Confirmamos la transacción
        await pool.query('COMMIT');


            res.status(201).json({
                message: 'Usuario registrado correctamente',
                locationreload: '/login'
                
            });
        
    } catch (error) {
        // En caso de error, deshacemos los cambios
        await pool.query('ROLLBACK');
        console.log(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

export default router;

// import { Router } from 'express';
// import pool from '../database/config.js';
// import { v4 as uuid } from 'uuid';
// import * as path from 'path';
// import { fileURLToPath } from 'url';
// import fileUpload from 'express-fileupload';

// const router = Router();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));



// // Middleware para manejar la carga de archivos
// router.use(fileUpload());
// // router.use(urlencoded({ extended: true }));
// // router.use(json());



// router.get('/', async (req, res) => {
//     res.render('registro', { title: 'Registro' });
// });

// router.post('/', async (req, res) => {
//     try {
//         let { nombre, apellido, email, rut, password, telefono, calle, numero_casa, comuna, region, pais } = req.body;
//         let foto = req.files ? req.files.foto : null;

//         console.log('Datos recibidos:', req.body);

//         if (!nombre || !apellido || !email || !rut || !password || !telefono || !calle || !numero_casa || !comuna || !region || !pais || !foto) {
//             return res.status(400).json({
//                 message: 'Debe proporcionar todos los datos.',
//             });
//         }

//         let imagen = `img-${uuid().slice(0, 4)}-${foto.name}`;
//         let uploadPath = path.join(__dirname, 'public/img', imagen);

//         // Iniciamos una transacción
//         await pool.query('BEGIN');

//         // Insertamos en la tabla de usuarios y obtenemos el ID generado
//         let { rows } = await pool.query(
//             'INSERT INTO usuarios (nombre, apellido, email, rut, password, telefono, foto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
//             [nombre, apellido, email, rut, password, telefono, imagen]
//         );
//         const usuarioId = rows[0].id;

//         // Insertamos en la tabla de direcciones, utilizando el ID del usuario
//         await pool.query(
//             'INSERT INTO direccion (calle, numero_casa, comuna, region, pais, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)',
//             [calle, numero_casa, comuna, region, pais, usuarioId]
//         );

//         // Confirmamos la transacción
//         await pool.query('COMMIT');

//         // Guardamos la imagen en el servidor
//         foto.mv(uploadPath, (err) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Error al guardar la imagen' });
//             }

//             res.status(201).json({
//                 message: 'Usuario registrado correctamente',
//             });
//         });
//     } catch (error) {
//         // En caso de error, deshacemos los cambios
//         await pool.query('ROLLBACK');
//         console.log(error);
//         res.status(500).json({ error: 'Error al registrar el usuario' });
//     }
// });

// export default router;
