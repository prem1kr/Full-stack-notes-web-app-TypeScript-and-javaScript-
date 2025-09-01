import express from "express";
import { NotesCreate, NotesDelete, NotesEdit, NotesGet } from "../../controllers/notes/notesController.js";
import { auth } from "../../middleware/auth.js";

const notesRouter = express.Router();


notesRouter.post("/notes/create", auth, NotesCreate);
notesRouter.get("/notes/get", auth, NotesGet);
notesRouter.put("/notes/edit/:id", auth, NotesEdit);
notesRouter.delete("/notes/delete/:id", auth, NotesDelete);


export default notesRouter;
