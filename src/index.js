//Importo Librerias a utilizar
import server from "./services/server.js";
import { initWsServer, getWsServer } from "./services/socket.js";
import { DB } from "./classes/db.js";

//Configuro puerto a utilizar
const puerto = 8080;

//Inicio Server
const inicio = async () => {
  await DB.init();
  initWsServer(server);
  server.listen(puerto, () =>   console.log(`Servidor Escuchando en el puerto ${puerto}`));
  server.on("error", (error) => {
    console.log("Error en el Servidor!", error);
  });
};

inicio();