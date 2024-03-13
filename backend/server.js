const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({         
    host: "localhost",
    user: "root",
    password: "",
    database: "registration"
});

//registration route

app.post("/register", (req, res) => {

    const sql = "INSERT INTO user (`name`,`email`,`password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
            return res.json({ Error: "Error hashing sending password" });
        }
        const values = [req.body.name, req.body.email, hash];
        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.json({ Error: "Inserting data error in server" });
            } else {
                return res.json({ Status: "Success" });
            }
        });
    });
});

//login route
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM user where email=?';

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Error hashing fetching password" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "paasword compare error" });
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            })
        }
        else {
            return res.json({ Error: "no email existed" });
        }
    });
});

// route for verify user token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "token is missing" });
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
})

// route for logout user and delete its token in cookies
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

app.listen(8000, () => {
    console.log("app is running on port 8000");
})