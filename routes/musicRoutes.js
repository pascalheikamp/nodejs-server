import express from "express";
import {Faker, faker} from "@faker-js/faker";
import Music from "../models/Music.js";
const routes = express.Router();

// routes.patch('', (req, res) => {
//     if(req.header?.host === 'videos.nl') {
//         res.send()
//     }else {
//         res.status(400).json.body({
//             "message": "This is not supported"
//         })
//     }
// })

routes.get('/', async (req, res) => {
    let product = await Music.find()
    res.json(product)
})

routes.post('/create/', async (req, res) => {

})

routes.post('/seed', async (req, res) => {
    console.log("Seed DB");

    console.log(req.body)

    if(req.body?.method !== undefined && req.body.method === 'seed'){
    await Music.deleteMany({})
    for (let i=0; i <10; i++) {
        await Music.create({
            title:faker.music.songName(),
            releaseDate: faker.date.anytime(),
            duration: faker.number.int(180, 300),
            producer:faker.person.middleName(),
            artist: faker.person.middleName(),
            genre:faker.music.genre(),
        })
    }
    res.json({
        message:"Het werkt"
    })}
    else {
        res.sendStatus(400)
        console.log("There was error because the method was not a seed method")
    }
})

export default routes