
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
renderTareas();

// agregar tareas
addBtn.addEventListener("click", function () {
    const texto = taskInput.value;

    if (texto === "") {
        alert("Por favor escribe una tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    renderTareas();

    taskInput.value = "";
});


function renderTareas() {
    taskList.innerHTML = "";

    tareas.forEach(function (t) {
        const li = document.createElement("li");

        // Texto de la tarea
        const span = document.createElement("span");
        span.textContent = t.texto;
        if (t.completada) {
            span.classList.add("completed");
        }
        span.addEventListener("click", function () {
            t.completada = !t.completada;
            guardarTareas();
            renderTareas();
        });

        // Botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.style.background = "red";
        btnEliminar.style.color = "white";
        btnEliminar.style.border = "none";
        btnEliminar.style.cursor = "pointer";
        btnEliminar.addEventListener("click", function () {
            tareas = tareas.filter(item => item.id !== t.id);
            guardarTareas();
            renderTareas();
        });

        li.appendChild(span);
        li.appendChild(btnEliminar);
        taskList.appendChild(li);
    });
}

// Guardar en localStorage
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}
