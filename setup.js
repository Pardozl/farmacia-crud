const mysql = require('mysql2/promise');

async function setup() {
    const conn = await mysql.createConnection({
        host: 'monorail.proxy.rlwy.net',
        port: 31262,
        user: 'root',
        password: 'abVqrBVKMdlmobUwVrqdNHaYJfAWuRSI',
        database: 'railway'
    });

    await conn.execute(`CREATE TABLE IF NOT EXISTS Proveedor (
        id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        email VARCHAR(100),
        direccion VARCHAR(200)
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS Cliente (
        id_cliente INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        email VARCHAR(100),
        direccion VARCHAR(200)
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS Medicamento (
        id_medicamento INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(255),
        categoria VARCHAR(50),
        precio DECIMAL(10,2),
        stock INT DEFAULT 0,
        fecha_vencimiento DATE,
        id_proveedor INT,
        FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS RecetaMedica (
        id_receta INT PRIMARY KEY AUTO_INCREMENT,
        fecha DATE NOT NULL,
        medico VARCHAR(100),
        diagnostico VARCHAR(255),
        id_cliente INT,
        FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS DetalleReceta (
        id_detalle INT PRIMARY KEY AUTO_INCREMENT,
        id_receta INT,
        id_medicamento INT,
        cantidad INT NOT NULL,
        dosis VARCHAR(100),
        FOREIGN KEY (id_receta) REFERENCES RecetaMedica(id_receta),
        FOREIGN KEY (id_medicamento) REFERENCES Medicamento(id_medicamento)
    )`);

    await conn.execute(`INSERT INTO Proveedor (nombre, telefono, email, direccion) VALUES
        ('Laboratorios Bayer', '601-1234567', 'ventas@bayer.com', 'Calle 80 #45-20, Bogotá'),
        ('Genfar S.A.', '601-9876543', 'info@genfar.com', 'Carrera 15 #100-30, Bogotá')`);

    await conn.execute(`INSERT INTO Cliente (nombre, telefono, email, direccion) VALUES
        ('Carlos Pérez', '310-1111111', 'carlos@gmail.com', 'Cra 7 #12-34, Bogotá'),
        ('María López', '315-2222222', 'maria@gmail.com', 'Calle 45 #23-10, Bogotá'),
        ('Juan Rodríguez', '320-3333333', 'juan@gmail.com', 'Av. 68 #55-20, Bogotá')`)
    ;


    await conn.execute(`INSERT INTO Medicamento (nombre, descripcion, categoria, precio, stock, fecha_vencimiento, id_proveedor) VALUES
        ('Ibuprofeno 400mg', 'Antiinflamatorio', 'Analgésico', 8500.00, 100, '2026-12-31', 1),
        ('Amoxicilina 500mg', 'Antibiótico', 'Antibiótico', 15000.00, 80, '2026-06-30', 1),
        ('Metformina 850mg', 'Control glucemia', 'Antidiabético', 12000.00, 60, '2027-01-15', 2),
        ('Loratadina 10mg', 'Antihistamínico', 'Alérgico', 6500.00, 120, '2026-09-30', 2)`);

    console.log('✅ Tablas creadas y datos insertados correctamente');
    await conn.end();
}

setup();