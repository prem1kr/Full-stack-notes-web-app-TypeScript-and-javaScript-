import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    message:{type:String, require:true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 

});

const notesModel = mongoose.model("notes", NotesSchema);
export default notesModel;
