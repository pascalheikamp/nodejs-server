import express from 'express';
import musicRoutes from "./routes/musicRoutes.js";
//here import route
import mongoose from 'mongoose'
// import cors from 'cors'
import 'dotenv/config'
import bodyParser from "body-parser";
import routes from "./routes/musicRoutes.js";

try {
    mongoose.connect(process.env.MONGODB_URL + process.env.MONGODB_PORT + '/' + process.env.MONGODB_NAME);
} catch (error) {
    console.log(error);
}


console.log('Connected to Mongo db');
const app = express();
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({extended: true}));

function checkUnsupportedFormat(req, res, next) {
    const acceptedFormats = ['application/json'];

    if (!req.headers.accept) {
        req.negotiatedFormat = acceptedFormats[0];
        return next();
    }

    const requestedFormats = req.headers.accept.split(',')
    const supportedFormat = requestedFormats.find(format => acceptedFormats)

    if (supportedFormat) {
        req.negotiatedFormat = supportedFormat.trim();
        return next()
    } else {
        return res.status(406).send('Not Acceptable');
    }
}

app.use(checkUnsupportedFormat);
app.use((err, res, req, next) => {
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err) {
       return res.status(400).send('Invalid x-www-form-urlencoded data. Please check your request.');
    }
})
app.use('/music', musicRoutes);


app.listen(process.env.EXPRESS_PORT, function () {
    console.log('Server started! at ' + process.env.EXPRESS_PORT)
});