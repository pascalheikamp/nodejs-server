import mongoose, {Schema} from "mongoose";
// const mongoosePaginate = require('mongoose-paginate');
const musicScheme = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        unique: true,
    },
    releaseDate:  {
        type:String,
    },
    duration:  {
        type:String,
    },
    producer: {
        type:String,
    },
    artist: {
        type:String,
    },
    genre: {
        type:String,
    },
});

// musicScheme.plugin(mongoosePaginate);

const Music = mongoose.model('Music', musicScheme);
export default Music;