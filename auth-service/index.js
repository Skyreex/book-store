const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// const {
//   DB_USER,
//   DB_PASSWORD,
//   DB_HOST,
//   DB_PORT,
//   DB_NAME
// } = process.env;
// const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const PORT = +process.env[__dirname.match(/\w+-service/)[0].replace('-', '_').toUpperCase() + "_PORT"];
const MONGO_URI = `mongodb://localhost:27017/${process.env.MONOGDB_DATABASE}`;

mongoose.connect(MONGO_URI)
    .then((result) => app.listen(PORT, () => console.log('Auth Server is running on port ' + PORT)))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.json({message: 'Welcome to the auth service'}));

app.use(authRoutes);