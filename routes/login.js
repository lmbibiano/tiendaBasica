import { Router } from 'express';
import  pool  from '../database/config.js';
const router = Router();

router.get('/', (req, res) => {
    res.render("login", { 
        title: 'Login' });
});

router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log("Datos recibidos:", req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "Debe proporcionar todos los datos." });
        }

        let consulta = {
            text: "SELECT id, nombre, email FROM usuarios WHERE email = $1 AND password = $2 returning id",
            values: [id, email, password]
        };

        let { rows, rowCount } = await pool.query(consulta);

        if (rowCount == 0) {
            return res.status(400).json({ message: "Credenciales inválidas." });
        }

        let usuario = rows[0];

        res.json({
            message: "Login realizado con éxito",
            usuario
        });

    } catch (error) {
        console.error("Error en proceso de login:", error);
        res.status(500).json({
            message: "Error en proceso de login."
        });
    }
});

export default router;
