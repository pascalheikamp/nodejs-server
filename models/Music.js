import mongoose, {Schema} from "mongoose";
// const mongoosePaginate = require('mongoose-paginate');
const musicScheme = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        unique: true,
        required:true
    },
    releaseDate:  {
        type:String,
        required:true
    },
    duration:  {
        type:String,
        required: true
    },
    producer: {
        type:String,
        required: true
    },
    artist: {
        type:String,
        required: true
    },
    genre: {
        type:String,
        required:true
    },
});

// musicScheme.plugin(mongoosePaginate);

const Music = mongoose.model('Music', musicScheme);
export default Music;