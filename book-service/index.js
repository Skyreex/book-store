const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const requireAuth = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(cookieParser());




const DB_URI = `${process.env.DB_HOST}${process.env.DB_NAME}`;
mongoose.connect(DB_URI)
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.json({message: 'Welcome to the books service'}));
app.get("*", requireAuth)
app.use(bookRoutes);