const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysqlPool = require('./config/db');

//configure dotenv
dotenv.config();

//rest obj
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use('/api/v1/student', require("./routes/studentRoutes"));
app.get('/test', (req, res) => {
    res.status(200).send('<h1>Welcome</h1>');
});

//port
const PORT = process.env.PORT || 8000;

//conditionally listen
mysqlPool.query("SELECT 1").then(() => {
    //my sql
    console.log("MySQL DB Connected".bgCyan.white);
    //listen
    app.listen(PORT, () => {
        console.log(`Server Running on port ${process.env.PORT}`.bgYellow.green);
    });
})
    .catch((error) => {
        console.log(error);
    });

