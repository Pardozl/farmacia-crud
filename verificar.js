// verificar.js
const mysql = require('mysql2/promise');

async function verificar() {
    const conn = await mysql.createConnection({
        host: 'monorail.proxy.rlwy.net',
        port: 31262,
        user: 'root',
        password: 'abVqrBVKMdlmobUwVrqdNHaYJfAWuRSI',
        database: 'railway'
    });

    const [tablas] = await conn.execute('SHOW TABLES');
    console.log('Tablas existentes:', tablas);
    await conn.end();
}

verificar();