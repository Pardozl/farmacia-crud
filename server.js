const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


async function query(sql, params) {
    const conn = await mysql.createConnection(process.env.DATABASE_URL);
    const [rows] = await conn.execute(sql, params);
    await conn.end();
    return rows;
}


app.get('/medicamentos', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Medicamento');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/medicamentos', async (req, res) => {
    const { nombre, descripcion, categoria, precio, stock, fecha_vencimiento, id_proveedor } = req.body;
    try {
        await query('INSERT INTO Medicamento (nombre, descripcion, categoria, precio, stock, fecha_vencimiento, id_proveedor) VALUES (?,?,?,?,?,?,?)',
            [nombre, descripcion, categoria, precio, stock, fecha_vencimiento, id_proveedor]);
        res.json({ mensaje: 'Medicamento creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/medicamentos/:id', async (req, res) => {
    const { nombre, descripcion, categoria, precio, stock, fecha_vencimiento } = req.body;
    try {
        await query('UPDATE Medicamento SET nombre=?, descripcion=?, categoria=?, precio=?, stock=?, fecha_vencimiento=? WHERE id_medicamento=?',
            [nombre, descripcion, categoria, precio, stock, fecha_vencimiento, req.params.id]);
        res.json({ mensaje: 'Medicamento actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/medicamentos/:id', async (req, res) => {
    try {
        await query('DELETE FROM Medicamento WHERE id_medicamento=?', [req.params.id]);
        res.json({ mensaje: 'Medicamento eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});


app.get('/clientes', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Cliente');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/clientes', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        await query('INSERT INTO Cliente (nombre, telefono, email, direccion) VALUES (?,?,?,?)',
            [nombre, telefono, email, direccion]);
        res.json({ mensaje: 'Cliente creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/clientes/:id', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        await query('UPDATE Cliente SET nombre=?, telefono=?, email=?, direccion=? WHERE id_cliente=?',
            [nombre, telefono, email, direccion, req.params.id]);
        res.json({ mensaje: 'Cliente actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        await query('DELETE FROM Cliente WHERE id_cliente=?', [req.params.id]);
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});


app.get('/proveedores', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Proveedor');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/proveedores', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        await query('INSERT INTO Proveedor (nombre, telefono, email, direccion) VALUES (?,?,?,?)',
            [nombre, telefono, email, direccion]);
        res.json({ mensaje: 'Proveedor creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/proveedores/:id', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        await query('UPDATE Proveedor SET nombre=?, telefono=?, email=?, direccion=? WHERE id_proveedor=?',
            [nombre, telefono, email, direccion, req.params.id]);
        res.json({ mensaje: 'Proveedor actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/proveedores/:id', async (req, res) => {
    try {
        await query('DELETE FROM Proveedor WHERE id_proveedor=?', [req.params.id]);
        res.json({ mensaje: 'Proveedor eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});