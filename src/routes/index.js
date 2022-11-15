// //Importo Librerias a utilizar
import Router from "express";
import productosRouter from "./productos.js";

const router = Router();

router.use("/productos", productosRouter);

export default router;
