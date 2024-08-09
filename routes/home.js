import { Router } from 'express';
import pool from '../database/config.js';
const router = Router();

// router.get('/', async (req, res) => {
//     res.render("home", { title: 'Inicio' });
// });

router.get("/", async (req, res) => {
    try {
        let { nombre, precioMin, precioMax, orderFilter } = req.query;
        let order = "ORDER BY modelo.id";

        if (orderFilter) {
            switch (orderFilter) {
                case "precioMayorMenor":
                    order = `ORDER BY modelo.precio DESC`;
                    break;
                case "precioMenorMayor":
                    order = `ORDER BY modelo.precio ASC`;
                    break;
                case "stockAsc":
                    order = `ORDER BY modelo.stock ASC`;
                    break;
                case "stockDesc":
                    order = `ORDER BY modelo.stock DESC`;
                    break;
            }
        }

        let consulta = {
            text: `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                ${order}`,
            values: []
        };

        // Filtrar por nombre, precio mínimo, y precio máximo
        if (nombre && precioMin && precioMax) {
            consulta.text = `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                    modelo.precio >= $1 AND modelo.precio <= $2 
                    AND (modelo.nombre ILIKE $3 OR modelo.descripcion ILIKE $3)
                ${order}`;
            consulta.values = [precioMin, precioMax, `%${nombre}%`];
        } else if (nombre && precioMin) {
            consulta.text = `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                    modelo.precio >= $1 
                    AND (modelo.nombre ILIKE $2 OR modelo.descripcion ILIKE $2)
                ${order}`;
            consulta.values = [precioMin, `%${nombre}%`];
        } else if (nombre && precioMax) {
            consulta.text = `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                    modelo.precio <= $1 
                    AND (modelo.nombre ILIKE $2 OR modelo.descripcion ILIKE $2)
                ${order}`;
            consulta.values = [precioMax, `%${nombre}%`];
        } else if (precioMin) {
            consulta.text = `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                    modelo.precio >= $1
                ${order}`;
            consulta.values = [precioMin];
        } else if (precioMax) {
            consulta.text = `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                    modelo.precio <= $1
                ${order}`;
            consulta.values = [precioMax];
        } else if (nombre) {
            consulta.text = `
                SELECT 
                    modelo.id, 
                    modelo.nombre AS nombre, 
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
                    modelo.nombre ILIKE $1 OR modelo.descripcion ILIKE $1
                ${order}`;
            consulta.values = [`%${nombre}%`];
        }

        let { rows } = await pool.query(consulta);

        res.render("home", {
            homeView: true,
            productos: rows  // Pasamos los productos a la vista
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.render("home", {
            error: "No se pudo acceder a los datos de los productos.",
            homeView: true
        });
    }
});


export default router;