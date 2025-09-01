import express from "express";
import { NotesCreate, NotesDelete, NotesEdit, NotesGet } from "../../controllers/notes/notesController.js";
import { auth } from "../../middleware/auth.js";

const notesRouter = express.Router();


notesRouter.post("/create", auth, NotesCreate);
notesRouter.get("/get", auth, NotesGet);
notesRouter.put("/edit/:id", auth, NotesEdit);
notesRouter.delete("/delete/:id", auth, NotesDelete);


export default notesRouter;
