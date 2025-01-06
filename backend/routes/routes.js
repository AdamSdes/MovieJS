import express from 'express';
import { register, login } from '../controllers/authController.js'; // Шлях виправлено
import checkAuth from '../utils/checkAuth.js'; // Шлях виправлено

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', checkAuth, (req, res) => {
    res.send('This is a protected route!');
});

export default router;
