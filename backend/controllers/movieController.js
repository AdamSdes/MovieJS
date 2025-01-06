import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cinema'
}).promise();

export async function getMovies() {
    const [rows] = await pool.query('SELECT * FROM movie');
    return rows;
}

export async function getMovie(id_movie) {
    const [rows] = await pool.query('SELECT * FROM movie WHERE id_movie = ?', [id_movie]);
    return rows[0];
}

export async function createMovie(name, year, country, age_rating, runtime_min, director, script) {
    const result = await pool.query(`
        INSERT INTO movie (name, year, country, age_rating, runtime_min, director, script)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, year, country, age_rating, runtime_min, director, script]);

    const id_movie = result[0].insertId;
    return getMovie(id_movie);
}

export async function searchMovies(age_rating, year, country, genre_id) {
    let query = 'SELECT m.* FROM movie m';
    const params = [];

    query += ' WHERE 1=1';

    if (age_rating) {
        query += ' AND m.age_rating = ?';
        params.push(age_rating);
    }

    if (year) {
        query += ' AND m.year = ?';
        params.push(year);
    }

    if (country) {
        query += ' AND m.country = ?';
        params.push(country);
    }

    if (genre_id) {
        query += ' AND m.id_movie IN (SELECT movie_id_movie FROM movie_has_genre WHERE genre_id_genre = ?)';
        params.push(genre_id);
    }

    const [rows] = await pool.query(query, params);
    return rows;
}

export async function getGenres() {
    const [rows] = await pool.query('SELECT * FROM genre');
    return rows;
}

export async function createGenre(name) {
    const result = await pool.query('INSERT INTO genre (name) VALUES (?)', [name]);
    const id_genre = result[0].insertId;
    return getGenre(id_genre);
}

export async function getGenre(id_genre) {
    const [rows] = await pool.query('SELECT * FROM genre WHERE id_genre = ?', [id_genre]);
    return rows[0];
}
