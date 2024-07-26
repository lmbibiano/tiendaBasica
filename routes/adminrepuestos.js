import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("adminrepuestos", { title: 'Adminrepuestos' });
});

router.post('/adminrepuestos', (req, res) => {

});

export default router;