//Importo Librerias a utilizar
import moment from "moment";

//Doy Formato al Mensaje
export const formatoMensaje = (data) => {
  const { email, mensaje } = data;
  return {
    email,
    mensaje,
    hora: moment().format("DD-MM-YYYY HH:MM:SS"),
  };
};
