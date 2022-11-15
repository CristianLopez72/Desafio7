//Importo Librerias a utilizar
import express from "express";
import { createProductoController } from "../controller/productos.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/",
  body("nombre").not().isEmpty().isString().trim().escape(),
  body("precio").not().isEmpty().isInt({ min: 1 }),
  body("categoria").not().isEmpty().isString().trim().escape(),
  body("foto").not().isEmpty().isString().trim(),
  createProductoController
);

export default router;