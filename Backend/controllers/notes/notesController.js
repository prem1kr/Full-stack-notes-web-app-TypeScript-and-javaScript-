import notesModel from "../../models/notes/notes.js";

export const NotesCreate = async (req, res) => {
  const { message } = req.body;

  try {
    const userId = req.user.id; 
    const add = await notesModel.create({ message, userId });

    console.log(`Notes created successfully: ${add}`);
    res.status(201).json(add);
  } catch (error) {
    console.log("Error during notes saving", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const NotesGet = async (req, res) => {
  try {
    const userId = req.user.id;
    const get = await notesModel.find({ userId }); // 🔥 filter by user
    console.log(`Notes fetched successfully ${get}`);
    res.status(200).json({ message: "Notes fetched successfully", data: get });
  } catch (error) {
    console.log("Error fetching notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const NotesDelete = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Note ID is required" });

  try {
    const userId = req.user.id;
    const deletedNote = await notesModel.findOneAndDelete({ _id: id, userId });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found or not authorized" });
    }

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
    const userId = req.user.id;
    const updatedNote = await notesModel.findOneAndUpdate(
      { _id: id, userId },
      { message },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or not authorized" });
    }

    console.log(`Note updated successfully: ${updatedNote}`);
    res.status(200).json({ message: "Note updated successfully", data: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
