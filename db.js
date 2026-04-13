const sql = require('mssql');

const config = {
    server: 'localhost',
    port: 1433,
    database: 'Farmacia',
    user: 'farmacia_user',
    password: '12345',
    options: {
        trustServerCertificate: true,
        encrypt: false,
        enableArithAbort: true
    }
};

async function conectar() {
    try {
        const pool = await sql.connect(config);
        console.log('✅ Conectado correctamente');
        return pool;
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

conectar();

module.exports = { sql, config };