import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("login", { title: 'Login' });
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Aquí iría la lógica de autenticación
    res.send(`Bienvenido, ${email}`);
});

export default router;