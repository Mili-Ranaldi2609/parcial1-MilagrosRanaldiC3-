import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    resumen: { type: String },
    genero: { type: String, required: true },
    publicacion: { type: Date, required: true },
    disponible: {
        type: Boolean, required: true
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }
});

export default mongoose.model("Book", bookSchema);
