import express from "express";
import { addBookToAuthor, deleteAuthor, getAuthorById, getAuthors, postAuthor, putAuthor } from "../controllers/authorController.js";
export const authorRoutes = express.Router();

authorRoutes.get("/", getAuthors);
authorRoutes.get("/:id", getAuthorById);
authorRoutes.post("/",postAuthor);
authorRoutes.put("/:id", putAuthor);
authorRoutes.delete("/:id", deleteAuthor);
authorRoutes.put("/:id/addBook/:bookId", addBookToAuthor);
