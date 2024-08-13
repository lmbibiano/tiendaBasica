import { Router } from 'express';
import pool from '../database/config.js';

const router = Router();
router.get('/', (req, res) => {
    res.render("detalle", { 
        title: 'Detalle' });
});

router.get("/detalle/:id", async (req, res) => {
    try {
        let { id } = req.params; // Obtenemos el ID del producto de la URL

        // Ajustamos la consulta SQL para reflejar la estructura de tus tablas
        let { rows } = await pool.query(
            `SELECT 
                modelo.id, 
                modelo.nombre, 
                modelo.descripcion, 
                modelo.precio, 
                modelo.stock, 
                modelo.imagen AS foto, 
                tipo_producto.nombre AS categoria, 
                marca.nombre AS marca
             FROM 
                modelo
             JOIN 
                tipo_producto ON modelo.categoria_id = tipo_producto.id
             JOIN 
                marca ON modelo.marca_id = marca.id
             WHERE 
                modelo.id = $1`, 
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).render("/detalle", {
                error: "Producto no encontrado.",
                detalleView: true
            });
        }

        let producto = rows[0];
        console.log(producto);

        res.render("detalle", {
            detalleView: true,
            producto
        });
    } catch (error) {
        console.error("Error al obtener el detalle del producto:", error);
        res.status(500).render("detalle", {
            error: "No se pudo acceder a los datos del producto.",
            detalleView: true
        });
    }
});

export default router;







// import { Router } from 'express';
// import  pool  from '../database/config.js';
// const router = Router();

// // router.get('/', (req, res) => {
// //     res.render("ProductoDetalle", { 
// //         title: 'Detalle' });
// // });

// router.get("/producto/detalle/:id", async (req, res) => {
//     try {
//         let { id } = req.params; //le esta mandando el id por la direccion url 

//         let { rows } = await pool.query("SELECT id, nombre, descripcion, precio, stock, foto FROM productos WHERE id = $1", [id]);

//         let producto = rows[0];
//         console.log(producto);
//         res.render("ProductoDetalle", {
//             ProductoDetalleView: true,
//             producto
//         })
//     } catch (error) {
//         res.render("ProductoDetalle", {
//             error: "No se pudo acceder a los datos del producto.",
//             ProductoDetalleView: true
//         })
//     }
// });

// export default router;