//Importo Librerias a utilizar
import { formatoMensaje } from "../utils/mensaje.js";
import { DB } from "../classes/db.js";
import { Server } from "socket.io";

let tablaProductos = "productos";
let tablaMensajes = "mensajes";

const datosProducto = {
  nombre: undefined,
  precio: undefined,
  categoria: undefined,
  foto: undefined,
};

let io;

export const initWsServer = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Nueva Conexion Detectada!");

    socket.on("NuevaConexion", async () => {
      socket.emit("Bienvenido a Finca Online!");
    });

    //Listen for new product
    socket.on("guardarProducto", async (nuevoProducto) => {
      datosProducto.nombre = nuevoProducto.nombre;
      datosProducto.precio = nuevoProducto.precio;
      datosProducto.categoria = nuevoProducto.categoria;
      datosProducto.foto = nuevoProducto.foto;
      const nuevoId = await DB.create(tablaProductos, datosProducto);
      const productoAgregado = await DB.getById(tablaProductos, nuevoId);
      io.emit("ultimoProducto", datosProducto);
    });

    //Listen for chat messages
    socket.on("enviarMensaje", async (mensaje) => {
      io.emit("nuevoMensaje", formatoMensaje(mensaje));

      try {
        const nuevoId = await DB.create(
          tablaMensajes,
          formatoMensaje(mensaje)
        );
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

export const getWsServer = () => {
  return io;
};
