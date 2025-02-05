const express = require('express')
const app = express()
const PORT = 8080
const mongoose = require('mongoose')
require('dotenv').config({})

const userRoutes = require('./routers/user.routes')
const noteRoutes = require('./routers/note.routes')

app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/speech_test')
    .then(() => {
        console.log("DB connected successfully with mongoose");
    })
    .catch((err) => {
        console.log("DB not connected successfully with mongoose");
        console.error(err); 
    });

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use('/user',userRoutes)
app.use('/note',noteRoutes)


app.listen(PORT, (req, res) => {
    console.log('Server is running at', 'http://localhost:8080')
})