import { Router } from 'express';
const router = Router();

router.get('/api/v1/adminrepuest', async (req, res) => {
    res.render("adminrepuest", { title: 'Adminrepuest' });
});

router.post('/api/v1/adminrepuest', (req, res) => {

});

export default router;