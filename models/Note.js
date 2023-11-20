import mongoose, {Schema} from "mongoose";

const noteScheme = new mongoose.Schema({
    title: String,
    price: Number,
    department: String
});

const Note = mongoose.model('Note', noteScheme);
export default Note;