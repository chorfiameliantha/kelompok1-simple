const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'your-db-endpoint',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Endpoint to fetch data
app.get('/data', (req, res) => {
    db.query('SELECT * FROM your_table', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to add data
app.post('/add-data', (req, res) => {
    const { name, value } = req.body; // Expecting `name` and `value` from the form
    const sql = 'INSERT INTO your_table (name, value) VALUES (?, ?)';
    db.query(sql, [name, value], (err, result) => {
        if (err) throw err;
        res.send('Data added successfully');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
