import express from "express";
import { NotesCreate, NotesDelete, NotesEdit, NotesGet } from "../../controllers/notes/notesController.js";

const notesRouter = express.Router();

notesRouter.post("/notes/create", NotesCreate);
notesRouter.get("/notes/get", NotesGet);
notesRouter.delete("/notes/delete/:id", NotesDelete);
notesRouter.put("/notes/edit/:id", NotesEdit);

export default notesRouter;