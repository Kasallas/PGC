// Datos iniciales (simulan registros de PostGIS)
let predios = JSON.parse(localStorage.getItem('predios_ubate')) || [
  { id: 'UB-001', propietario: 'María Rodríguez', uso: 'Residencial',  area: 120,  lat: 5.3095, lng: -73.8150 },
  { id: 'UB-002', propietario: 'Juan Pérez',      uso: 'Comercial',    area: 250,  lat: 5.3105, lng: -73.8135 },
  { id: 'UB-003', propietario: 'Ana Gómez',       uso: 'Residencial',  area: 95,   lat: 5.3085, lng: -73.8170 },
  { id: 'UB-004', propietario: 'Pedro Silva',     uso: 'Institucional',area: 800,  lat: 5.3110, lng: -73.8160 },
  { id: 'UB-005', propietario: 'Lucía Torres',    uso: 'Agropecuario', area: 3200, lat: 5.3150, lng: -73.8180 }
];

// Renderizar tabla
function renderizar() {
  const tbody = document.querySelector('#tabla-predios tbody');
  tbody.innerHTML = '';
  predios.forEach((p, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.propietario}</td>
        <td>${p.uso}</td>
        <td>${p.area}</td>
        <td>${p.lat}</td>
        <td>${p.lng}</td>
        <td>
          <button class="btn btn-azul" onclick="editar(${i})">✏️</button>
          <button class="btn btn-rojo" onclick="eliminar(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem('predios_ubate', JSON.stringify(predios));
}

// Guardar (crear o actualizar)
document.getElementById('btn-guardar').addEventListener('click', () => {
  const id = document.getElementById('f-id').value.trim();
  const propietario = document.getElementById('f-propietario').value.trim();
  const uso = document.getElementById('f-uso').value;
  const area = parseFloat(document.getElementById('f-area').value);
  const lat = parseFloat(document.getElementById('f-lat').value);
  const lng = parseFloat(document.getElementById('f-lng').value);

  if (!id || !propietario || isNaN(area) || isNaN(lat) || isNaN(lng)) {
    alert('⚠️ Completa todos los campos');
    return;
  }

  const idx = predios.findIndex(p => p.id === id);
  const nuevo = { id, propietario, uso, area, lat, lng };

  if (idx >= 0) {
    predios[idx] = nuevo;       // UPDATE
    alert('✅ Predio actualizado');
  } else {
    predios.push(nuevo);        // INSERT
    alert('✅ Predio agregado');
  }

  renderizar();
  limpiar();
});

// Editar
function editar(i) {
  const p = predios[i];
  document.getElementById('f-id').value = p.id;
  document.getElementById('f-propietario').value = p.propietario;
  document.getElementById('f-uso').value = p.uso;
  document.getElementById('f-area').value = p.area;
  document.getElementById('f-lat').value = p.lat;
  document.getElementById('f-lng').value = p.lng;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Eliminar
function eliminar(i) {
  if (confirm(`¿Eliminar el predio ${predios[i].id}?`)) {
    predios.splice(i, 1);       // DELETE
    renderizar();
  }
}

// Limpiar formulario
document.getElementById('btn-limpiar').addEventListener('click', limpiar);
function limpiar() {
  ['f-id','f-propietario','f-area','f-lat','f-lng'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-uso').selectedIndex = 0;
}

// Inicializar
renderizar();

