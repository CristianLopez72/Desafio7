import { createProductoServices } from "../services/productos.js";
import { validationResult } from "express-validator";

export const createProductoController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, precio, categoria, foto } = req.body;

    const data = {
      nombre,
      precio,
      categoria,
      foto,
    };

    const nuevoProducto = await createProductoServices(data);

    res.status(201).json({
      data: nuevoProducto,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};