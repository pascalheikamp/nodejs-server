
import express from 'express';
import noteRoutes from "./routes/noteRoutes.js";
//here import route
import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect('mongodb://127.0.0.1:27017/test');

console.log('Connected to Mongo db');
const app = express();

app.use('/notes', noteRoutes)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.get('/', function (req, res) {
//     res.send("Hello world")
// })

app.get('/', (req, res) => {
   res.send("Hello world")
});


app.listen(process.env.EXPRESS_PORT, function () {
    console.log('Server started!')
});