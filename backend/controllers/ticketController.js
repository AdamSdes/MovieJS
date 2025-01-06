import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cinema'
}).promise();

export async function getTickets() {
    const [rows] = await pool.query('SELECT * FROM ticket');
    return rows;
}

export async function getTicket(id_ticket) {
    const [rows] = await pool.query('SELECT * FROM ticket WHERE id_ticket = ?', [id_ticket]);
    return rows[0];
}

export async function createTicket(seat_number, row_number, seat_price, ticket_showtime_id_showtime) {
    const result = await pool.query(`
        INSERT INTO ticket (seat_number, row_number, seat_price, ticket_showtime_id_showtime)
        VALUES (?, ?, ?, ?)
    `, [seat_number, row_number, seat_price, ticket_showtime_id_showtime]);

    const id_ticket = result[0].insertId;
    return getTicket(id_ticket);
}

export async function searchTickets(seat_number, row_number) {
    let query = 'SELECT * FROM ticket';
    const params = [];

    query += ' WHERE 1=1';

    if (seat_number) {
        query += ' AND seat_number = ?';
        params.push(seat_number);
    }

    if (row_number) {
        query += ' AND row_number = ?';
        params.push(row_number);
    }

    const [rows] = await pool.query(query, params);
    return rows;
}