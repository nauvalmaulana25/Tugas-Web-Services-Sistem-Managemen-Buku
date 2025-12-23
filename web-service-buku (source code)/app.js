const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('./buku.db', (err) => {
    if (err) {
        console.error('Gagal koneksi ke database:', err.message);
    } else {
        console.log('Terhubung ke database SQLite.');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    judul TEXT,
    penulis TEXT,
    tahun INTEGER
)`);

app.post('/api/books', (req, res) => {
    const { judul, penulis, tahun } = req.body;
    const sql = `INSERT INTO books (judul, penulis, tahun) VALUES (?, ?, ?)`;
    
    db.run(sql, [judul, penulis, tahun], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            judul,
            penulis,
            tahun
        });
    });
});

app.get('/api/books', (req, res) => {
    const sql = `SELECT * FROM books`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

app.get('/api/books/:id', (req, res) => {
    const sql = `SELECT * FROM books WHERE id = ?`;
    const params = [req.params.id];
    
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }
        res.json({
            message: "success",
            data: row
        });
    });
});

app.put('/api/books/:id', (req, res) => {
    const { judul, penulis, tahun } = req.body;
    const sql = `UPDATE books SET judul = ?, penulis = ?, tahun = ? WHERE id = ?`;
    const params = [judul, penulis, tahun, req.params.id];
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan untuk diupdate" });
        }
        res.json({
            message: "Data berhasil diperbarui",
            data: { id: req.params.id, judul, penulis, tahun }
        });
    });
});

app.delete('/api/books/:id', (req, res) => {
    const sql = `DELETE FROM books WHERE id = ?`;
    const params = [req.params.id];
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan untuk dihapus" });
        }
        res.json({ message: "Data berhasil dihapus" });
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});