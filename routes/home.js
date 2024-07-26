import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("home", { title: 'Inicio' });
});

export default router;