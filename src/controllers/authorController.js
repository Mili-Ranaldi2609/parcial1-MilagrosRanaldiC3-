import bookSchema from "../models/Book.js"
import authorSchema from "../models/Author.js"

// GET AUTHORS //
export const getAuthors = async (req, res) => {
    try {
        const authors = await authorSchema.find().populate('libros')
        res.json(authors)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// GET AUTHOR BY ID //
export const getAuthorById = async (req, res) => {
    try {
        const author = await authorSchema.findById(req.params.id).populate("libros");
        if (!author) return res.status(404).json({ message: "Autor no encontrado" });
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST AUTHOR //
export const postAuthor = async (req, res) => {
    try {
        const { nombre, bio, fechaNacimiento,nacionalidad } = req?.body
        const newAuthor = new authorSchema({
            nombre, 
            bio, 
            fechaNacimiento,
            nacionalidad,
            libros: [],
        });
        await newAuthor.save();
        res.status(201).json(newAuthor);

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
// PUT AUTHOR //
export const putAuthor = async (req, res) => {
    try {
        const updatedAuthor= await authorSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedAuthor) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
// DELETE AUTHOR
export const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id
        const deleted = await authorSchema.findByIdAndDelete(authorId)
        if (!deleted) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }

        res.status(200).json({ message: "Autor eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// ADD BOOK
export const addBookToAuthor = async (req, res) => {
    const { id, bookId } = req.params;
    
    try {
      // Buscar el autor
      const author = await authorSchema.findById(id);
      if (!author) {
        return res.status(404).json({ message: "Author no encontrado" });
      }
      
      // Buscar el Libro
      const book = await bookSchema.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
  
      // Verificar si ya está en el Autor actual
      if (author.libros.includes(bookId)) {
        return res.status(400).json({ message: "El libro ya está en el autor" });
      }
  
      // Agregar el libro al autor
      author.libros.push(bookId);
      await author.save();
      res.status(200).json({
        message: "Libro agregado al Autor correctamente",
        author,
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };