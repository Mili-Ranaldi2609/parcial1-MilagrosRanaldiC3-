import bookSchema from "../models/Book.js"
import authorSchema from "../models/Author.js";

// GET BOOKS //
export const getBooks = async (req, res) => {
    try {
        const books = await bookSchema.find()
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// GET BOOK BY ID //
export const getBookById = async (req, res) => {
    try {
        const book = await bookSchema.findById(req.params.id)
        if (!book) return res.status(404).json({ message: "Libro no encontrado" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST BOOK //
export const postBook = async (req, res) => {
    try {
        const { titulo, resumen, genero, publicacion, disponible, autor } = req.body;

        // Verificamos si el autor existe
        const existingAuthor = await authorSchema.findById(autor);
        if (!existingAuthor) {
            return res.status(400).json({ message: "Autor no encontrado" });
        }

        const newBook = new bookSchema({
            titulo,
            resumen,
            genero,
            publicacion,
            disponible,
            autor, // ✅ se guarda el autor relacionado
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// PUT BOOK //
export const putBook = async (req, res) => {
    try {
        const updatedBook = await bookSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
// DELETE BOOK
export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Verificar si está asignado a un autor
        const authorUsingBook = await authorSchema.findOne({ libros: bookId });
        if (authorUsingBook) {
            return res.status(400).json({ message: "No se puede eliminar el libro, está asignado a un autor." });
        }

        const deleted = await bookSchema.findByIdAndDelete(bookId);
        if (!deleted) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
