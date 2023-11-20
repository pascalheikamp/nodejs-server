
import express from 'express';
import 'dotenv/config'
const app = express();

app.get('/', req => {
    return 'Hello world'
})


app.listen(process.env.EXPRESS_PORT, function () {
    console.log('Server started!')
});