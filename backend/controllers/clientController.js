import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cinema'
}).promise();

export async function getClients() {
    const [rows] = await pool.query("select * from client")
    return rows
};

export async function getClient(id_client) {
    const [rows] = await pool.query(`
        select * 
        from client
        where id_client = ?
        `, [id_client])
    return rows[0]
};

export async function createClient(first_name, second_name, email, pass) {
    const result = await pool.query(`
        insert into client (first_name, second_name, email, pass)
        values (?, ?, ?, ?)
        `, [first_name, second_name, email, pass])
    const id_client = result.insertid_client
    return getClient(id_client)
};

export async function getClientByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM client WHERE email = ?", [email]);
    return rows[0];
}
