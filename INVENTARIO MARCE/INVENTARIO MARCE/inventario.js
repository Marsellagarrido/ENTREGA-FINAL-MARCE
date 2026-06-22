const productos = [
  { nombre: "Arroz",           imagen: "arroz.jpg" },
  { nombre: "Frijoles",        imagen: "frijoles.jpg" },
  { nombre: "Aceite",          imagen: "aceite.jpg" },
  { nombre: "Sal",             imagen: "sal.jpg" },
  { nombre: "Azúcar",          imagen: "azucar.jpg" },
  { nombre: "Harina",          imagen: "harina.jpg" },
  { nombre: "Leche",           imagen: "leche.jpg" },
  { nombre: "Huevos",          imagen: "huevos.jpg" },
  { nombre: "Mantequilla",     imagen: "mantequilla.jpg" },
  { nombre: "Queso",           imagen: "queso.jpg" },
  { nombre: "Pollo",           imagen: "pollo.jpg" },
  { nombre: "Carne de res",    imagen: "carne-de-res.jpg" },
  { nombre: "Tomate",          imagen: "tomate.jpg" },
  { nombre: "Cebolla",         imagen: "cebolla.jpg" },
  { nombre: "Papa",            imagen: "papa.jpg" },
  { nombre: "Pasta",           imagen: "pasta.jpg" },
  { nombre: "Atún en lata",    imagen: "atun-en-lata.jpg" },
  { nombre: "Café",            imagen: "cafe.jpg" },
  { nombre: "Jabón",           imagen: "jabon.jpg" },
  { nombre: "Papel higiénico", imagen: "papel-higienico.jpg" }
];

const selectNombre = document.getElementById("nombre");
const imgProducto  = document.getElementById("imagen-producto");
const btnAgregar   = document.getElementById("btnAgregar");
const tablaBody    = document.querySelector("#tabla tbody");
const totalGeneral = document.getElementById("totalGeneral");

// Cargar opciones en el select
productos.forEach((p, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = p.nombre;
  selectNombre.appendChild(option);
});

// Mostrar imagen al seleccionar
selectNombre.addEventListener("change", function () {
  if (this.value === "") {
    imgProducto.style.display = "none";
    return;
  }
  const p = productos[parseInt(this.value)];
  imgProducto.src = p.imagen;
  imgProducto.alt = p.nombre;
  imgProducto.style.display = "block";
});

// Botón Agregar
btnAgregar.addEventListener("click", () => {
  if (selectNombre.value === "") {
    alert("Por favor selecciona un producto.");
    return;
  }
  const nombre   = productos[parseInt(selectNombre.value)].nombre;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio   = parseFloat(document.getElementById("precio").value);

  if (isNaN(cantidad) || isNaN(precio)) {
    alert("Por favor complete todos los campos.");
    return;
  }

  agregarProducto(nombre, cantidad, precio);
  limpiar();
});

function agregarProducto(nombre, cantidad, precio) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${nombre}</td>
    <td>
      <button class="menos">–</button>
      <span class="cant">${cantidad}</span>
      <button class="mas">+</button>
    </td>
    <td>$<span class="precio">${precio}</span><button class="editarPrecio">✏️</button></td>
    <td>$<span class="total">${(cantidad * precio).toFixed(2)}</span></td>
    <td><button class="eliminar">🗑️</button></td>
  `;
  tablaBody.appendChild(tr);
  recalcularTotal();
}

function limpiar() {
  selectNombre.value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
  imgProducto.style.display = "none";
}

tablaBody.addEventListener("click", function (e) {
  const fila = e.target.closest("tr");
  if (!fila) return;

  if (e.target.classList.contains("mas")) {
    let cant = fila.querySelector(".cant");
    cant.textContent = parseInt(cant.textContent) + 1;
  }
  if (e.target.classList.contains("menos")) {
    let cant = fila.querySelector(".cant");
    let actual = parseInt(cant.textContent);
    if (actual > 0) cant.textContent = actual - 1;
  }
  if (e.target.classList.contains("editarPrecio")) {
    let precioSpan = fila.querySelector(".precio");
    const nuevo = prompt("Nuevo precio:", precioSpan.textContent);
    if (nuevo !== null && !isNaN(parseFloat(nuevo))) {
      precioSpan.textContent = parseFloat(nuevo);
    }
  }
  if (e.target.classList.contains("eliminar")) {
    fila.remove();
    recalcularTotal();
    return;
  }

  actualizarFila(fila);
  recalcularTotal();
});

function actualizarFila(fila) {
  const cant   = parseInt(fila.querySelector(".cant").textContent);
  const precio = parseFloat(fila.querySelector(".precio").textContent);
  fila.querySelector(".total").textContent = (cant * precio).toFixed(2);
  if (cant === 0) fila.classList.add("low-stock");
  else fila.classList.remove("low-stock");
}

function recalcularTotal() {
  let suma = 0;
  document.querySelectorAll("#tabla tbody .total").forEach(t => {
    const valor = parseFloat(t.textContent);
    if (!isNaN(valor)) suma += valor;
  });
  totalGeneral.textContent = "Total general: $" + suma.toFixed(2);
}