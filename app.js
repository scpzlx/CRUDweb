const form = document.getElementById('form');
const titulo = document.getElementById('titulo');
const descripcion = document.getElementById('descripcion');
const lista = document.getElementById('lista');
const idInput = document.getElementById('id');
const cancelarBtn = document.getElementById('cancelar');

// Obtener items de localStorage
function obtenerDatos() {
  return JSON.parse(localStorage.getItem('items')) || [];
}

// Guardar items en localStorage
function guardarDatos(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

// Renderizar la lista
function renderizar() {
  const items = obtenerDatos();
  lista.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${item.titulo}</strong> - ${item.descripcion || ''}</span>
      <div class="actions">
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
      </div>
    `;

    // Evento para editar
    li.querySelector('.editar').addEventListener('click', () => {
      titulo.value = item.titulo;
      descripcion.value = item.descripcion;
      idInput.value = index;
      cancelarBtn.style.display = 'inline';
    });

    // Evento para eliminar
    li.querySelector('.eliminar').addEventListener('click', () => {
      const itemsActualizados = obtenerDatos(); // obtener siempre la última versión
      itemsActualizados.splice(index, 1);       // eliminar el elemento correcto
      guardarDatos(itemsActualizados);          // actualizar localStorage
      renderizar();                             // volver a dibujar la lista
      form.reset();
      idInput.value = '';
      cancelarBtn.style.display = 'none';
    });

    lista.appendChild(li);
  });
}

// Crear o actualizar item
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const items = obtenerDatos();
  const id = idInput.value;

  if (!titulo.value.trim()) {
    alert('El título es obligatorio');
    return;
  }

  if (id) {
    // Actualizar
    items[id] = {
      titulo: titulo.value.trim(),
      descripcion: descripcion.value.trim()
    };
  } else {
    // Crear nuevo
    items.push({
      titulo: titulo.value.trim(),
      descripcion: descripcion.value.trim()
    });
  }

  guardarDatos(items);
  renderizar();
  form.reset();
  idInput.value = '';
  cancelarBtn.style.display = 'none';
});

// Cancelar edición
cancelarBtn.addEventListener('click', () => {
  form.reset();
  idInput.value = '';
  cancelarBtn.style.display = 'none';
});

// Inicializar
renderizar();
