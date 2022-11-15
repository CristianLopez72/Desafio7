// //Importo Librerias a utilizar
import express from "express";
import http from "http";
import mainRouter from "../routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { DB } from "../classes/db.js";

//Configuracion Basica
const app = express();
const server = http.Server(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

app.get("/", async (req, res) => {
   let tablaProductos = "productos";
   let productos = await DB.getAll(tablaProductos);
   let cantidadProductos = productos.length;
   let hayProductos = cantidadProductos == 0 ? false : true;
   res.render("guardarProducto", { productos, hayProductos });
 });

app.use("/api", mainRouter);

export default server;