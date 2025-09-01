import express from "express";
import { NotesCreate, NotesDelete, NotesEdit, NotesGet } from "../../controllers/notes/notesController.js";
import { auth } from "../middleware/auth.js";

const notesRouter = express.Router();


router.post("/create", auth, NotesCreate);
router.get("/get", auth, NotesGet);
router.put("/edit/:id", auth, NotesEdit);
router.delete("/delete/:id", auth, NotesDelete);


export default notesRouter;