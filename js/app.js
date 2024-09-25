import { deleteTareas, getTareas, postTareas, putTareas } from "./api.js";

const boton = document.getElementById('boton-anadir');
const entrada = document.getElementById('entrada-tarea');
const tareasDiv = document.getElementById('tareas');

boton.addEventListener('click', async () => {
    let tarea = entrada.value;
    if (tarea) {
        await postTareas(tarea);
        entrada.value = '';
        escribirTareas();
    }
});

async function escribirTareas() {
    tareasDiv.innerHTML = '';
    let tareitas = await getTareas();

    let tareasHTML = '';
    tareitas.forEach(element => {
        tareasHTML += `
            <div>
                <h1>Tarea: ${element.name}</h1>
                <h1>ID: ${element.id}</h1>
                <button class="boton-borrar" data-id="${element.id}">Borrar Tarea</button>
                <input id="modificacion-${element.id}" type="text" placeholder="Modificar tarea">
                <button class="boton-modificar" data-id="${element.id}">Modificar Tarea</button>
            </div>`;
    });

    tareasDiv.innerHTML = tareasHTML;

    // Attach event listeners for deletion
    document.querySelectorAll('.boton-borrar').forEach(boton => {
        boton.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');
            await deleteTareas(id);
            escribirTareas();  // Refresh the task list
        });
    });

    // Attach event listeners for modification
    document.querySelectorAll('.boton-modificar').forEach(boton => {
        boton.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');
            const nuevoNombre = document.getElementById(`modificacion-${id}`).value;
            if (nuevoNombre) {
                await putTareas(nuevoNombre, id);
                escribirTareas();  // Refresh the task list
            }
        });
    });
}

// Initial population of tasks
escribirTareas();
