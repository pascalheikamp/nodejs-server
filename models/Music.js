import mongoose, {Schema} from "mongoose";
// const mongoosePaginate = require('mongoose-paginate');
const musicScheme = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        required:true,
        unique: true,
    },
    artist: {
        required:true,
        type:String,
    },
    genre: {
        required:true,
        type:String,
    },
});

// musicScheme.plugin(mongoosePaginate);

const Music = mongoose.model('Music', musicScheme);
export default Music;