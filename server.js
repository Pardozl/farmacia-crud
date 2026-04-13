const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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



app.get('/medicamentos', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Medicamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/medicamentos', async (req, res) => {
    const { nombre, descripcion, categoria, precio, stock, fecha_vencimiento, id_proveedor } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .input('categoria', sql.VarChar, categoria)
            .input('precio', sql.Decimal, precio)
            .input('stock', sql.Int, stock)
            .input('fecha_vencimiento', sql.Date, fecha_vencimiento)
            .input('id_proveedor', sql.Int, id_proveedor)
            .query('INSERT INTO Medicamento (nombre, descripcion, categoria, precio, stock, fecha_vencimiento, id_proveedor) VALUES (@nombre, @descripcion, @categoria, @precio, @stock, @fecha_vencimiento, @id_proveedor)');
        res.json({ mensaje: 'Medicamento creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.put('/medicamentos/:id', async (req, res) => {
    const { nombre, descripcion, categoria, precio, stock, fecha_vencimiento } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .input('categoria', sql.VarChar, categoria)
            .input('precio', sql.Decimal, precio)
            .input('stock', sql.Int, stock)
            .input('fecha_vencimiento', sql.Date, fecha_vencimiento)
            .query('UPDATE Medicamento SET nombre=@nombre, descripcion=@descripcion, categoria=@categoria, precio=@precio, stock=@stock, fecha_vencimiento=@fecha_vencimiento WHERE id_medicamento=@id');
        res.json({ mensaje: 'Medicamento actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/medicamentos/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Medicamento WHERE id_medicamento=@id');
        res.json({ mensaje: 'Medicamento eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get('/clientes', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Cliente');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/clientes', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('direccion', sql.VarChar, direccion)
            .query('INSERT INTO Cliente (nombre, telefono, email, direccion) VALUES (@nombre, @telefono, @email, @direccion)');
        res.json({ mensaje: 'Cliente creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/clientes/:id', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('direccion', sql.VarChar, direccion)
            .query('UPDATE Cliente SET nombre=@nombre, telefono=@telefono, email=@email, direccion=@direccion WHERE id_cliente=@id');
        res.json({ mensaje: 'Cliente actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Cliente WHERE id_cliente=@id');
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get('/proveedores', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Proveedor');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/proveedores', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('direccion', sql.VarChar, direccion)
            .query('INSERT INTO Proveedor (nombre, telefono, email, direccion) VALUES (@nombre, @telefono, @email, @direccion)');
        res.json({ mensaje: 'Proveedor creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/proveedores/:id', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('direccion', sql.VarChar, direccion)
            .query('UPDATE Proveedor SET nombre=@nombre, telefono=@telefono, email=@email, direccion=@direccion WHERE id_proveedor=@id');
        res.json({ mensaje: 'Proveedor actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/proveedores/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Proveedor WHERE id_proveedor=@id');
        res.json({ mensaje: 'Proveedor eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});