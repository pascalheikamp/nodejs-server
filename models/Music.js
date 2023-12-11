import mongoose, {Schema} from "mongoose";
// const mongoosePaginate = require('mongoose-paginate');
const musicScheme = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        unique: true
    },
    releaseDate: Date,
    duration: Number,
    producer: String,
    artist: String,
    genre: String,
});

// musicScheme.plugin(mongoosePaginate);

const Music = mongoose.model('Music', musicScheme);
export default Music;