import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cinema'
}).promise();

export async function getShowtimes() {
    const [rows] = await pool.query('SELECT * FROM showtime');
    return rows;
}

export async function getShowtime(id_showtime) {
    const [rows] = await pool.query('SELECT * FROM showtime WHERE id_showtime = ?', [id_showtime]);
    return rows[0];
}

export async function createShowtime(movie_id_st, show_time, showtimeformat, hall_number) {
    const result = await pool.query(`
        INSERT INTO showtime (movie_id_st, show_time, showtimeformat, hall_number)
        VALUES (?, ?, ?, ?)
    `, [movie_id_st, show_time, showtimeformat, hall_number]);

    const id_showtime = result[0].insertId;
    return getShowtime(id_showtime);
}

export async function searchShowtimes(movie_id_st, show_time) {
    let query = 'SELECT * FROM showtime';
    const params = [];

    query += ' WHERE 1=1';

    if (movie_id_st) {
        query += ' AND movie_id_st = ?';
        params.push(movie_id_st);
    }

    if (show_time) {
        query += ' AND show_time = ?';
        params.push(show_time);
    }

    const [rows] = await pool.query(query, params);
    return rows;
}
