import express from "express";
import {Faker, faker} from "@faker-js/faker";
import Music from "../models/Music.js";

const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
        const {page = 1, limit = 10} = req.query
        let music  =  await Music.find().limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await Music.countDocuments();
        res.json({
            items:  music,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findById(id);
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

function paginatedResult(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // let musics = await Music.find();

        const results = {};
        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.results = model.slice(startIndex, endIndex);
        res.paginateResult = results;
        next();
    }
}

export default routes