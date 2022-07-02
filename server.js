const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path : './.env'});

const slack = require('./app/routes/slack');

const app = express();

app.use(express.json());

app.use('/api/v1/slack', slack);

global.__basedir = __dirname;

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode and listening on port ${PORT}`);
});
