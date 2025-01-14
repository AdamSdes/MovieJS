import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js'; // Шлях виправлено

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${4444}`);
});
