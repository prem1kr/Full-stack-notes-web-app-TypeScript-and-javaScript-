import { compareSync } from "bcrypt";
import notesModel from "../../models/notes/notes.js";

export const NotesCreate = async (req, res) => {
    const { message } = req.body;

    try {
        const add = await notesModel.create({ message });

        console.log(`Notes created successfully: ${add}`);

        res.status(201).json(add);
    } catch (error) {
        console.log("Error during notes saving", error);
        res.status(500).json({ message: "Internal server Error" });
    }
};



export const NotesGet = async (req, res) => {
    try{
         const get = await notesModel.find();
         console.log(`notes fetched successfully ${get}`);
         res.status(200).json({message:"notes fetched successfully", get});
    }catch(error) {
        console.log("notes fetched successfully");
        res.json({message:"Internal server error"});
    }
}



export const NotesDelete = async (req, res) => {
    const { id } = req.params; 
    if (!id) return res.status(400).json({ message: "Note ID is required" });
    try {
        const deletedNote = await notesModel.findByIdAndDelete(id);
      
        console.log(`Note deleted successfully ${deletedNote}`);
        res.status(200).json({ message: "Note deleted successfully", data: deletedNote });
    } catch (error) {
        console.error("Error during notes delete:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const NotesEdit = async (req, res) => {
  const { id } = req.params; 
  const { message } = req.body;
  try {
    const updatedNote = await notesModel.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    console.log(`Note updated successfully: ${updatedNote}`);
    res.status(200).json({message: "Note updated successfully",data: updatedNote});
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
