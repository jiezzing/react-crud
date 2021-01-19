const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');

const PORT = process.env.PORT || 3001;
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react-crud-db'
});

dotenv.config({ path: './config/config.env' });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.get('/api/get',(req, res) => {
    const fetchQuery = "SELECT * FROM users";
    db.query(fetchQuery, (err, result) => {
        res.send(result);
    });
});
app.get('/api/get/:userId',(req, res) => {
    const userId = req.params.userId;

    const fetchQuery = "SELECT * FROM users WHERE id=?";
    db.query(fetchQuery, userId, (err, result) => {
        res.send(result);
    });
});
app.post('/api/insert',(req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;

    const insertQuery = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(insertQuery, [userName, userEmail], (err, result) => {
        res.status(200).json({
            status: 200,
            ok: true,
            data: {
                id: result.insertId,
                name: userName,
                email: userEmail
            }
        })
    });
});
app.delete('/api/delete/:userId',(req, res) => {
    // req.params gets the passed parameter
    const userId = req.params.userId;

    const deleteQuery = "DELETE FROM users WHERE id=?";
    db.query(deleteQuery, userId, (err, result) => {
        console.log(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
