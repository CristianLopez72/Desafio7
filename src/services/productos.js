import { DB } from "../classes/db.js";

const nombreTabla = "productos";

export const createProductoServices = async (data) => {
  try {
    const nuevoId = await DB.create(nombreTabla, data);
    const nuevoProducto = await DB.getById(nombreTabla, nuevoId);
    return nuevoProducto;
  } catch (error) {
    throw error;
  }
};