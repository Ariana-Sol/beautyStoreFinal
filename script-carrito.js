
const productos = [
  { id: 1, nombre: "Crema Hydroboost", precio: 12000, imagen: "imagenes/crema hydroboost.jpg" },
  { id: 2, nombre: "Delineador Maybelline", precio: 12000, imagen: "imagenes/delineador.png" },
  { id: 3, nombre: "Gycolic Gloss", precio: 14600, imagen: "imagenes/Gycolic gloss.jpg" },
  { id: 4, nombre: "Iluminador Maybelline", precio: 14600, imagen: "imagenes/iluminador.jpg" },
  { id: 5, nombre: "Perfume Victoria Secret", precio: 43900, imagen: "imagenes/Perfume.jpeg" },
  { id: 6, nombre: "Sky High", precio: 19800, imagen: "imagenes/skyhigh.jpeg" },
  { id: 7, nombre: "Agua Micelar", precio: 9800, imagen: "imagenes/AguaMicelar.jpeg" },
  { id: 8, nombre: "Serum Revitalift", precio: 19600, imagen: "imagenes/SerumRevitalift.png" },
  { id: 9, nombre: "Protector Nivea", precio: 13500, imagen: "imagenes/protectorNivea.jpg" },
  { id: 10, nombre: "Serum Retinol", precio: 24300, imagen: "imagenes/Serumretinol.jpg" },
];


const tienda = document.querySelector(".Tienda");

function mostrarProductos() {
  tienda.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio.toLocaleString()}</p>
      <button data-id="${prod.id}">Agregar al carrito</button>
    `;
    tienda.appendChild(div);
  });
}

mostrarProductos();


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contadorCarrito = document.getElementById("contador-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const carritoContenedor = document.getElementById("carrito-contenedor");
const iconoCarrito = document.querySelector(".carrito-icono");

function actualizarContador() {
  contadorCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function actualizarCarritoDOM() {
  if (!listaCarrito || !totalCarrito) return; 
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalCarrito.textContent = total.toLocaleString();
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id == id);
  const existe = carrito.find(p => p.id == id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  actualizarCarritoDOM();
  alert("¡Has agregado este producto al carrito!");
}

tienda.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");
    agregarAlCarrito(id);
  }
});

iconoCarrito?.addEventListener("click", () => {
  carritoContenedor?.classList.toggle("oculto");
});

actualizarContador();
actualizarCarritoDOM();









const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("Nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (nombre.length < 8) {
      alert("El nombre debe tener al menos 8 caracteres.");
      return;
    }

    if (mensaje.length < 8) {
      alert("El mensaje debe tener al menos 8 caracteres.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    alert("¡Formulario enviado correctamente!");
    form.reset();
  });
}
