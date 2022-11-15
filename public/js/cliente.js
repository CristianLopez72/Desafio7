const productForm = document.getElementById("productForm");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");
const inputFoto = document.getElementById("foto");
const tbodyProductos = document.getElementById("tableContent");

const chatForm = document.getElementById("chatForm");
const inputEmail = document.getElementById("email");
const mensajeChat = document.getElementById("chat");
const inputMensaje = document.getElementById("mensaje");

const socket = io();

window.addEventListener("load", function (e) {
  socket.emit("Nueva conexion registrada");
});

socket.on("Bienvenido a Finca Online", (data) => {
  alert(data);
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let nuevoProducto = {
    nombre: inputNombre.value,
    precio: inputPrecio.value,
    categoria: inputCategoria.value,
    foto: inputFoto.value,
  };

  socket.emit("guardarProducto", nuevoProducto);

  inputNombre.value = "";
  inputPrecio.value = "";
  inputCategoria.value = "";
  inputFoto.value = "";
});

socket.on("nuevoProducto", (nuevoProducto) => {
  guardarNuevoProducto(nuevoProducto);
});

function guardarNuevoProducto(nuevoProducto) {
  const trProducto = document.createElement("tr");
  const tdNombre = document.createElement("td");
  const tdPrecio = document.createElement("td");
  const tdCategoria = document.createElement("td");
  const tdFoto = document.createElement("td");
  const productoImg = document.createElement("img");

  trProducto.appendChild(tdNombre);
  trProducto.appendChild(tdPrecio);
  trProducto.appendChild(tdCategoria);
  trProducto.appendChild(tdFoto);
  tdFoto.appendChild(productoImg);

  tdNombre.innerText = nuevoProducto.nombre;
  tdPrecio.innerText = nuevoProducto.precio;
  tdCategoria.innerText = nuevoProducto.categoria;

  productoImg.setAttribute("src", nuevoProducto.foto);
  productoImg.setAttribute("alt", "Imágen");
  productoImg.classList.add("imagenAdaptada");

  tbodyProductos.appendChild(trProducto);
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let mensaje = {
    email: inputEmail.value,
    mensaje: inputMensaje.value,
  };

  socket.emit("enviarMensaje", mensaje);

  inputEmail.value = "";
  inputMensaje.value = "";
});

socket.on("nuevoMensaje", (nuevoMensaje) => {
  agregarNuevoMensaje(nuevoMensaje);
});

function agregarNuevoMensaje(nuevoMensaje) {
  const pEmail = document.createElement("p");
  const pHora = document.createElement("p");
  const pMensaje = document.createElement("p");
  const mensajeFinal = document.createElement("p");

  pEmail.classList.add("Azul");
  pHora.classList.add("Marron");
  pMensaje.classList.add("Verde");

  pEmail.innerText = nuevoMensaje.email;
  pHora.innerText = `[${nuevoMensaje.hora}]:`;
  pMensaje.innerText = `${nuevoMensaje.mensaje}`;

  mensajeFinal.appendChild(pEmail);
  mensajeFinal.appendChild(pHora);
  mensajeFinal.appendChild(pMensaje);

  mensajeFinal.classList.add("mensajeFinal");

  mensajeChat.appendChild(mensajeFinal);
}