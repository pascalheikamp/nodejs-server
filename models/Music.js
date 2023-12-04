import mongoose, {Schema} from "mongoose";

const musicScheme = new mongoose.Schema({
    id:Number,
    title: String,
    releaseDate: Date,
    duration:Number,
    producer:String,
    artist: String,
    genre: String,
});

const Music = mongoose.model('Music', musicScheme);
export default Music;