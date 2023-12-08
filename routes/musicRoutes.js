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

//https://www.youtube.com/watch?v=9OfL9H6AmhQ

routes.get('/', async (req, res) => {
    try {
        let musics = await Music.find()
        res.json(musics)
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findById(id);
        res.send(music)
    } catch (error) {
        res.status(500).send(error)
    }
});

routes.post('/musics/', async (req, res) => {
    try {
        const {title, releaseDate, duration, producer, artist, genre} = req.body;
        const music = new Music({title, releaseDate, duration, producer, artist, genre});
        await music.save();
        res.status(201).send(req.body)
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findByIdAndDelete(id);
        res.send(music);

    } catch (error) {
        res.status(500).send(error);
    }
})

routes.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, releaseDate, duration, producer, artist, genre} = req.body;
        const music = await Music.findByIdAndUpdate(id, {
            title,
            releaseDate,
            duration,
            producer,
            artist,
            genre
        }, {new: true});
        res.send(music)

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

routes.post('/seed', async (req, res) => {
    console.log("Seed DB");

    console.log(req.body)

    if (req.body?.method !== undefined && req.body.method === 'seed') {
        await Music.deleteMany({})
        for (let i = 0; i < 10; i++) {
            await Music.create({
                title: faker.music.songName(),
                releaseDate: faker.date.between({from: '2005-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z'}),
                duration: faker.number.int(180, 300),
                producer: faker.person.middleName(),
                artist: faker.person.middleName(),
                genre: faker.music.genre(),
            })
        }
        res.json({
            message: "Het werkt"
        })
    } else {
        res.sendStatus(400)
        console.log("There was error because the method was not a seed method")
    }
})

export default routes