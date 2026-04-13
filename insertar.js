const mysql = require('mysql2/promise');

async function insertar() {
    const conn = await mysql.createConnection({
        host: 'monorail.proxy.rlwy.net',
        port: 31262,
        user: 'root',
        password: 'abVqrBVKMdlmobUwVrqdNHaYJfAWuRSI',
        database: 'railway'
    });

    await conn.execute(`INSERT INTO Cliente (nombre, telefono, email, direccion) VALUES
        ('Carlos Pérez', '310-1111111', 'carlos@gmail.com', 'Cra 7 #12-34, Bogotá'),
        ('María López', '315-2222222', 'maria@gmail.com', 'Calle 45 #23-10, Bogotá'),
        ('Juan Rodríguez', '320-3333333', 'juan@gmail.com', 'Av. 68 #55-20, Bogotá')`);

    console.log('✅ Clientes insertados');
    await conn.end();
}

insertar();