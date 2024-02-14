import express from "express";
import {Faker, faker} from "@faker-js/faker";
import Music from "../models/Music.js";


const routes = express.Router();

routes.options('/', (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Allow', 'OPTIONS, GET, POST');
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Content-Type', 'application/json');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
});

routes.options('/:id', function (req, res, next) {
    res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

// routes.use('/' , async (req, res, next)=> {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// })
routes.get('/', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        const {negotiatedFormat} = req;
        if (negotiatedFormat === 'application/json') {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let music = await Music.find().limit(limit).skip((page - 1) * limit).exec();
            const items = music.map((musicMap) => {
                const item = musicMap.toJSON();
                item._links = {
                    self: {href: `${req.protocol}://${req.get('host')}/music/${musicMap._id}`},
                    collection: {href: `${req.protocol}://${req.get('host')}/music/`}
                }
                return item
            });
            const count = await Music.countDocuments();
            const baseUrl = `${req.protocol}://${req.get('host')}/music/`;
            const nextLink = `${baseUrl}?page=${page + 1}&limit=${limit}`;
            const prevLink = `${baseUrl}?page=${page - 1}&limit=${limit}`;
            let counter = 0;
            for (let i = 0; i < music.length; ++i) {
                counter++;
            }
            const jsonData = {
                items: items,
                _links: {
                    self: {
                        href: "http://145.24.222.101:8000/music"
                    },
                    collection: {
                        href: "http://145.24.222.101:8000/music"
                    }
                },
                pagination: {
                    currentPage: page,
                    currentItems: counter,
                    totalPages: Math.ceil(count / limit),
                    totalItems: count,
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
                            page: (startIndex > 0 ? page - 1 : null),
                            href: prevLink
                        },
                        next: {
                            page: (endIndex < music.length ? page + 1 : null),
                            href: nextLink
                        }
                    }
                }
            }
            res.json(jsonData);
        } else {
            res.status(415).send('Unsupported Media type');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/:id', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        const {id} = req.params;
        const music = await Music.findById(id).exec();
        if(!music) {
            return res.status(404).json({message: "Music not found"})
        }

        const item = music.toJSON();
        item._links = {
            self: {href: `${req.protocol}://${req.get('host')}/music/${music._id}`},
            collection: {href: `${req.protocol}://${req.get('host')}/music/`}
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error)
    }
});

// const middle = express.urlencoded({
//     extended: false,
//     limit: 10000,
//     parameterLimit: 2
// })
routes.post('/', async (req, res) => {
    console.log('method is post')
    try {
        const contentType = req.header("Content-Type");
        if (contentType === "application/json" || contentType === "application/x-www-form-urlencoded") {
            console.log('content-type is correct')
            const {title, artist, genre} = req.body || {};
            if (!title || !artist || !genre) {
                console.log('geen ingevoerde velden')
                return res.status(400).send('Invalid form data. Please provide title, artist and genre');
            }
            console.log(title, artist, genre)
            const music = new Music({title, artist, genre});
            await music.save();
            res.status(201).send(req.body)
            console.log('succesvol')
        } else {
            res.status(400).send("Invalid request, check content-type")
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findById(id);
        if(!music) {
            return res.status(404).json({message: "Music not found"})
        }
        await Music.deleteOne({_id: music._id})

        return res.status(204).json({message: "Item is successfully deleted"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

routes.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        let music = await Music.findById(id);
        const {title, artist, genre} = req.body;

        if (title && artist && genre) {
            await Music.updateOne({_id: music._id}, {
                title: title,
                artist: artist,
                genre: genre
            });
            res.status(200).send({message: "Item is successfully updated"});
            return
        } else {
            res.status(400).send({message: "fields must be filled in"})
        }

        // console.log(item)
        // res.status(200).json(item)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Invalid format or incorrect id'
        });
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