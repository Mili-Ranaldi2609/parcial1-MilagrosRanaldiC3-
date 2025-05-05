import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Importar routers
import { bookRoutes } from "./routes/books.js";
import { authorRoutes } from "./routes/authors.js";
dotenv.config(); // Carga variables del archivo .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite leer JSON en body

// Rutas base
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Conexión a MongoDB
const PORT = process.env.PORT || 3000; // Se utiliza la variable de entorno o el puerto 3000 por defecto

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
  });
})
.catch((err) => {
  console.error("Error al conectar a MongoDB:", err.message);
});
