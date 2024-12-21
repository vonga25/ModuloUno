const data = {
    "proyectos": [
        {
            "id": 1,
            "nombre": "Proyecto Clínica Odontológica",
            "descripcion": "Desarrollo de un sistema de gestión para la clínica odontológica",
            "tareas": [
                {
                    "id": 1,
                    "nombre": "Diseñar la base de datos",
                    "descripcion": "Definir las tablas, campos y relaciones para almacenar datos",
                    "estado_completado": false,
                    "fecha_limite": "2024-12-01"
                },
                {
                    "id": 2,
                    "nombre": "Implementar backend",
                    "descripcion": "Crear las APIs necesarias para gestionar las operaciones",
                    "estado_completado": false,
                    "fecha_limite": "2024-12-15"
                },
                {
                    "id": 3,
                    "nombre": "Diseño de UI/UX",
                    "descripcion": "Desarrollar una interfaz amigable para la gestión de datos",
                    "estado_completado": true,
                    "fecha_limite": "2024-11-20"
                }
            ]
        }
    ]
};

const container = document.getElementById('projects-container');
const formContainer = document.getElementById('form-container');
const addTaskBtn = document.getElementById('add-task-btn');
const taskForm = document.getElementById('task-form');

function renderProjects() {
    container.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    data.proyectos.forEach(proyecto => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        projectDiv.innerHTML = `
            <h2>${proyecto.nombre}</h2>
            <p><strong>Descripción:</strong> ${proyecto.descripcion}</p>
            <h3>Tareas:</h3>
        `;

        proyecto.tareas.forEach(tarea => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');

            taskDiv.innerHTML = `
                <p><strong>${tarea.nombre}</strong></p>
                <p>${tarea.descripcion}</p>
                <p><strong>Fecha Límite:</strong> ${tarea.fecha_limite}</p>
                <p class="${tarea.estado_completado ? 'completed' : 'pending'}">
                    ${tarea.estado_completado ? 'Completado' : 'Pendiente'}
                </p>
                <button onclick="changeTaskStatus(${proyecto.id}, ${tarea.id})">Cambiar Estado</button>
                <button onclick="deleteTask(${proyecto.id}, ${tarea.id})">Eliminar</button>
            `;

            projectDiv.appendChild(taskDiv);
        });

        container.appendChild(projectDiv);
    });
}

function addTask(proyectoId, nombre, descripcion, fechaLimite) {
    const proyecto = data.proyectos.find(p => p.id === proyectoId);
    if (proyecto) {
        const newTask = {
            id: proyecto.tareas.length + 1,
            nombre,
            descripcion,
            estado_completado: false,
            fecha_limite: fechaLimite
        };
        proyecto.tareas.push(newTask);
        renderProjects();
    }
}

function deleteTask(proyectoId, tareaId) {
    const proyecto = data.proyectos.find(p => p.id === proyectoId);
    if (proyecto) {
        proyecto.tareas = proyecto.tareas.filter(tarea => tarea.id !== tareaId);
        renderProjects();
    }
}

function changeTaskStatus(proyectoId, tareaId) {
    const proyecto = data.proyectos.find(p => p.id === proyectoId);
    if (proyecto) {
        const tarea = proyecto.tareas.find(t => t.id === tareaId);
        if (tarea) {
            tarea.estado_completado = !tarea.estado_completado; // Cambiar el estado
            renderProjects();
        }
    }
}

// Mostrar formulario de agregar tarea
addTaskBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

// Manejar envío del formulario de nueva tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-desc').value;
    const taskDate = document.getElementById('task-date').value;

    addTask(1, taskName, taskDesc, taskDate); // Agregar a proyecto con id 1
    taskForm.reset();
    formContainer.style.display = 'none';
});

// Renderizar proyectos al cargar
renderProjects();
