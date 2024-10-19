const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// MySQL Connection
const db = mysql.createConnection({
 host: 'sql12.freesqldatabase.com',
    user: 'sql12739189',
    password: 'ZT1JQLRDZx',
    database: 'sql12739189'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error: ', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Routes
app.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
});

// Create User
app.post('/add-user', (req, res) => {
    const { name, email, age } = req.body;
    db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Update User
app.post('/update-user', (req, res) => {
    const { id, name, email, age } = req.body;
    db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

// Delete User
app.post('/delete-user', (req, res) => {
    const { id } = req.body;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
