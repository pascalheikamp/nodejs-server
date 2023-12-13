import express from "express";
import {Faker, faker} from "@faker-js/faker";
import Music from "../models/Music.js";

const routes = express.Router();

routes.options('/', (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Allow', 'OPTIONS, GET, POST');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
});
routes.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let music = await Music.find().limit(limit * 1).skip((page - 1) * limit).exec();

        const paginationObj = {
            _links: {
                self: {
                    href: "test"
                },
                collection: {
                    href: "test"
                }
            }
        };
        const items = music.map((musicMap) => {
            const item = musicMap.toJSON();
            item._links = {
                self: {href: `${req.protocol}://${req.get('host')}/music/${musicMap._id}`},
                collection: {href: `${req.protocol}://${req.get('host')}/music/`}
            }
            return item
        });
        const count = await Music.countDocuments();
        const jsonData = {
            items: items,
            pagination: {
                currentPage: page,
                currentItems: 15,
                totalPages: Math.ceil(count / limit),
                _links: {
                    first: {
                        page: 1,
                        href: "http://145.24.222.101:8000/music"
                    },
                    last: {
                        page: limit,
                        href: "http://145.24.222.101:8000/music"
                    },
                    previous: {
                        page: (startIndex > 0 ? page - 1 : undefined),
                        href: "http://145.24.222.101:8000/music"
                    },
                    next: {
                        page: (endIndex < music.length ? page + 1 : ""),
                        href: "http://145.24.222.101:8000/music"
                    }
                }
            }
        }
        res.json(jsonData);
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
        if (title, releaseDate, duration, producer, artist, genre) {
            const music = new Music({title, releaseDate, duration, producer, artist, genre});
            await music.save();
            res.status(201).send(req.body)
        } else {
            res.status(500).send("some fields are empty")
        }
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