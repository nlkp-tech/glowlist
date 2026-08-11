const express = require('express');
const app = express();
const cors = require('cors');
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glowlist_db'
});

db.connect(err => {
    if (err) {
        console.error('Gagal konek ke database:', err);
    } else {
        console.log('Berhasil konek ke database Glowlist');
    }
})
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat Datang di Glowlist!');
});

app.listen(PORT, () => {
    console.log(`Server Glowlist jalan di http://localhost:${PORT}`);
});

app.get('/produk', (req, res) => {
    const sql = 'SELECT * FROM produk';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.get('/kategori', (req, res) => {
    const sql = 'SELECT * FROM kategori';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});