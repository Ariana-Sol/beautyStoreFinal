document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  configurarCarrito();
  validarFormulario();
});

function cargarProductos() {
  const contenedor = document.querySelector(".Tienda");
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toLocaleString()}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  document.querySelectorAll(".Tienda button").forEach(btn => {
    btn.addEventListener("click", () => {
      agregarAlCarrito(Number(btn.dataset.id));
    });
  });
}

function configurarCarrito() {
  const icono = document.querySelector(".carrito-icono");
  const popup = document.getElementById("carrito-contenedor");

  icono.addEventListener("click", () => {
    window.location.href = "carrito.html"; // redirige al carrito
  });

  actualizarContador();
}

function agregarAlCarrito(idProducto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find(item => item.id === idProducto);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("contador-carrito").textContent = total;
}

// Validar formulario de contacto
function validarFormulario() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("Nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    alert("¡Mensaje enviado con éxito!");
    form.reset();
  });
}
