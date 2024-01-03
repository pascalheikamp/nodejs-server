import mongoose, {Schema} from "mongoose";
// const mongoosePaginate = require('mongoose-paginate');
const musicScheme = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        unique: true,
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