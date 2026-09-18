// ============================================
// MAPA DE UBATÉ CON IMAGEN BASE
// ============================================

const mapa = L.map('mapa', {
  center: [5.3093, -73.8156],
  zoom: 11,
  zoomControl: true
});

// Capa con la imagen del mapa de Ubaté
// Coordenadas aproximadas de las esquinas del mapa
const bounds = [
  [5.20, -73.95],  // esquina suroeste
  [5.42, -73.68]   // esquina noreste
];

const capaMapaBase = L.imageOverlay('img/mapa-ubate.jpg', bounds).addTo(mapa);

mapa.fitBounds(bounds);

// --------------------------------------------
// PREDIOS (marcadores encima del mapa)
// --------------------------------------------
const predios = [
  { id: 'UB-001', propietario: 'María Rodríguez', uso: 'Residencial',   area: 120,  lat: 5.3095, lng: -73.8150 },
  { id: 'UB-002', propietario: 'Juan Pérez',      uso: 'Comercial',     area: 250,  lat: 5.3105, lng: -73.8135 },
  { id: 'UB-003', propietario: 'Ana Gómez',       uso: 'Residencial',   area: 95,   lat: 5.3085, lng: -73.8170 },
  { id: 'UB-004', propietario: 'Pedro Silva',     uso: 'Institucional', area: 800,  lat: 5.3110, lng: -73.8160 },
  { id: 'UB-005', propietario: 'Lucía Torres',    uso: 'Agropecuario',  area: 3200, lat: 5.3150, lng: -73.8180 }
];

const capaPredios = L.layerGroup().addTo(mapa);

predios.forEach(p => {
  L.circleMarker([p.lat, p.lng], {
    radius: 8,
    color: '#c1121f',
    fillColor: '#ffb703',
    fillOpacity: 0.9,
    weight: 2
  }).bindPopup(`
    <div class="popup-predio">
      <h4>Predio ${p.id}</h4>
      <table>
        <tr><td><b>Propietario:</b></td><td>${p.propietario}</td></tr>
        <tr><td><b>Uso:</b></td><td>${p.uso}</td></tr>
        <tr><td><b>Área:</b></td><td>${p.area} m²</td></tr>
      </table>
    </div>
  `).addTo(capaPredios);
});

// --------------------------------------------
// VÍAS PRINCIPALES
// --------------------------------------------
const vias = L.polyline([
  [5.305, -73.818],
  [5.309, -73.816],
  [5.313, -73.814]
], { color: '#1d3557', weight: 5, opacity: 0.8 })
.bindPopup('<b>Vía principal</b><br>Calle 5 - Ubaté');

// --------------------------------------------
// CONTROLES DE CAPAS
// --------------------------------------------
document.getElementById('capa-mapa').addEventListener('change', e => {
  e.target.checked ? mapa.addLayer(capaMapaBase) : mapa.removeLayer(capaMapaBase);
});
document.getElementById('capa-predios').addEventListener('change', e => {
  e.target.checked ? mapa.addLayer(capaPredios) : mapa.removeLayer(capaPredios);
});
document.getElementById('capa-vias').addEventListener('change', e => {
  e.target.checked ? mapa.addLayer(vias) : mapa.removeLayer(vias);
});

// --------------------------------------------
// COORDENADAS EN VIVO
// --------------------------------------------
mapa.on('mousemove', e => {
  document.getElementById('coords').innerText =
    `Lat: ${e.latlng.lat.toFixed(5)} | Lng: ${e.latlng.lng.toFixed(5)}`;
});