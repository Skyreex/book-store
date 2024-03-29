const express = require('express');
const mongoose = require('mongoose');
const loanRoutes = require('./routes/loanRoutes');
const requireAuth = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();


app.use(express.static('public'));
app.use(cookieParser());



const DB_URI = `${process.env.DB_HOST}${process.env.DB_NAME}`;
mongoose.connect(DB_URI)
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.json({message: 'Welcome to the loans service'}));
app.get("*", requireAuth)
app.use(loanRoutes);