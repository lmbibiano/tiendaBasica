import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("registro", { title: 'Registro' });
});

router.post('/registro', (req, res) => {
    const { email, password } = req.body;
    // Aquí iría la lógica de registro
    res.send(`Usuario registrado: ${email}`);
});

export default router;
