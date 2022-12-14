// Importing express
import express from "express";
// Importing Environment Variables
import dotenv from "dotenv";
// Importing Cors
import cors from "cors";
// Importing routes
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
// Importing db
import db from "./config/db.js";

// Setting environment variables
dotenv.config();

// Configuring express
const app = express();

// Configurar CORS
app.use(cors());

// Connecting to database
try {
  await db.authenticate();
  console.log("Conexion correcta a la DB");
} catch (error) {
  console.log(error);
}

//Routing
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// Port
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Servidor está funcionando desde el puerto ${PORT}`);
});
