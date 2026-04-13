// test.js
const mysql = require('mysql2/promise');

async function test() {
    try {
        const conn = await mysql.createConnection({
            host: 'monorail.proxy.rlwy.net',
            port: 31262,
            user: 'root',
            password: 'abVqrBVKMdlmobUwVrqdNHaYJfAWuRSI',
            database: 'railway',
            ssl: { rejectUnauthorized: false }
        });
        const [rows] = await conn.execute('SELECT * FROM Cliente');
        console.log('✅ Conexión OK - Clientes:', rows);
        await conn.end();
    } catch(err) {
        console.error('❌ Error:', err.message);
    }
}

test();