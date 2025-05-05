# 📚 Library API

API RESTful para la gestión de una biblioteca, desarrollada con **Node.js**, **Express** y **Mongoose**. Permite administrar libros y autores, almacenando los datos en **MongoDB Atlas**.

## 🎯 Objetivo
Facilitar el registro, consulta, modificación y eliminación de libros y autores en una base de datos MongoDB, cumpliendo buenas prácticas de arquitectura y validaciones.

---

## 📦 Estructura del Proyecto
library-api/
├── src/
│ ├── controllers/
│ │ ├── authorController.js
│ │ └── bookController.js
│ ├── models/
│ │ ├── Author.js
│ │ └── Book.js
│ ├── routes/
│ │ ├── authors.js
│ │ └── books.js
│ └── app.js
├── .env
├── package.json

---

## ⚙️ Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Postman (para pruebas)

---

# Clonar el repositorio
git clone https://github.com/tu-usuario/library-api.git
cd library-api

# Instalar dependencias
npm install

# Crear archivo .env y agregar la MONGO_URL

# Ejecutar el servidor
npm start



