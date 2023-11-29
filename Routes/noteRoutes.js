import express from "express";
import {Faker, faker} from "@faker-js/faker";
import Product from "../models/Note.js";
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

routes.post('/seed', async (req, res) => {
    console.log("Seed DB");

    if(req.body?.method === 'seed'){
    await Product.deleteMany({})
    for (let i=0; i <10; i++) {
        await Product.create({
            name:faker.commerce.product(),
            price: faker.commerce.price(),
            department: faker.commerce.department(),
        })
    }
    res.json({
        message:"Het werkt"
    })}
    else {
        console.log("There was error because the method was not a seed method")
    }
})

export default routes