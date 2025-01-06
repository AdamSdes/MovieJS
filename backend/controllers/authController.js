import crypto from 'crypto';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { email, password, firstName, secondName } = req.body;

        if (!email || !password || !firstName || !secondName) {
            return res.status(400).json({ message: 'Всі поля є обов\'язковими' });
        }

        const [existingUser] = await pool.query('SELECT * FROM client WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email вже зареєстрований' });
        }

        const hash = crypto.createHash('sha256').update(password).digest('hex');

        const [newUser] = await pool.query(
            'INSERT INTO client (first_name, second_name, email, pass) VALUES (?, ?, ?, ?)',
            [firstName, secondName, email, hash]
        );

        const token = jwt.sign({ userId: newUser.insertId }, 'secret123', { expiresIn: '30d' });

        res.json({ token });
    } catch (err) {
        console.error("Помилка реєстрації:", err.message || err);
        res.status(500).json({ message: 'Помилка реєстрації' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Всі поля є обов\'язковими' });
        }

        const [user] = await pool.query('SELECT * FROM client WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Неправильний логін або пароль' });
        }

        const hash = crypto.createHash('sha256').update(password).digest('hex');
        if (hash !== user[0].pass) {
            return res.status(400).json({ message: 'Неправильний логін або пароль' });
        }

        const token = jwt.sign({ userId: user[0].id_client }, 'secret123', { expiresIn: '30d' });

        res.json({ token });
    } catch (err) {
        console.error("Помилка авторизації:", err.message || err);
        res.status(500).json({ message: 'Помилка авторизації' });
    }
};
