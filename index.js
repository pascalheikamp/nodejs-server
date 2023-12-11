import express from 'express';
import musicRoutes from "./routes/musicRoutes.js";
//here import route
import mongoose from 'mongoose'
import 'dotenv/config'

try{
    mongoose.connect(process.env.MONGODB_URL + process.env.MONGODB_PORT + '/' + process.env.MONGODB_NAME);
} catch (error) {
    console.log(error);
}


console.log('Connected to Mongo db');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/music', musicRoutes);

app.get('/', (req, res) => {
    res.send("Hello world")
});


app.listen(process.env.EXPRESS_PORT, function () {
    console.log('Server started! at ' + process.env.EXPRESS_PORT)
});