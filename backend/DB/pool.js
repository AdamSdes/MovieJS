import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'cinema',
}).promise();



// Перевірка підключення до бази даних
pool.getConnection()
    .then((connection) => {
        console.log('Успішно підключено до бази даних');
        connection.release(); // Повернення з'єднання в пул після перевірки
    })
    .catch((err) => {
        console.error('Помилка підключення до бази даних:', err.message);
    });

export { pool }; // Іменований експорт
