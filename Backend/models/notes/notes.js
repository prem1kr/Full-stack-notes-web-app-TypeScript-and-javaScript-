import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    message:{type:String, require:true}
});

const notesModel = mongoose.model("notes", NotesSchema);
export default notesModel;