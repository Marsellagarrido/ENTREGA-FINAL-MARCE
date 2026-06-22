// Capturar elementos
const formulario = document.getElementById("usuario");
const input = document.getElementById("inputTarea");
const lista = document.getElementById("contLista");
const estadistica = document.getElementById("estadistica");

let pendientes = 0;
let completadas = 0;
let id = 1;
// Evento submit (agregar tarea)
formulario.addEventListener("submit", function(e) {
    e.preventDefault(); // evita recargar la página

    const texto = input.value.trim();

    if (texto === "") {
        alert("Debe escribir una tarea");
        return;
    }

    crearTarea(texto);
    input.value = "";
})// Función crear tarea
function crearTarea(texto) {
    id++;

    // Crear elementos
    const article = document.createElement("article");
    article.classList.add("tareas");
    article.setAttribute("id", id);

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const textoTarea = document.createTextNode(" " + texto);

    const icono = document.createElement("i");
    icono.classList.add("fa-solid", "fa-trash", "borrar");

    // Armar estructura
    label.appendChild(checkbox);
    label.appendChild(textoTarea);

    article.appendChild(label);
    article.appendChild(icono);

    lista.appendChild(article);

    pendientes++;

    actualizarEstadistica();

    // Evento completar tarea
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            completadas++;
            pendientes--;
        } else {
            completadas--;
            pendientes++;
        }
        actualizarEstadistica();
    });

    // Evento eliminar tarea
    icono.addEventListener("click", function() {

        // Ajustar contadores antes de eliminar
        if (checkbox.checked) {
            completadas--;
        } else {
            pendientes--;
        }

        lista.removeChild(article);
        actualizarEstadistica();
    });
}
// Actualizar estadísticas
function actualizarEstadistica() {
    estadistica.textContent = 
        "Tareas pendientes: " + pendientes + 
        " Completadas: " + completadas;
}