// ============================================
// REGISTRO DE USUARIOS - SIG UBATÉ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');
  const mensaje = document.getElementById('mensaje-error');

  // Verificar que el formulario existe
  if (!form) {
    console.error('❌ No se encontró el formulario con id "form-registro"');
    return;
  }

  console.log('✅ registro.js cargado correctamente');

  form.addEventListener('submit', (e) => {
    e.preventDefault();  // ← ESTO ES LO MÁS IMPORTANTE
    console.log('📝 Formulario capturado');

    mensaje.textContent = '';
    mensaje.style.color = '#c1121f';

    const nombre    = document.getElementById('reg-nombre').value.trim();
    const telefono  = document.getElementById('reg-telefono').value.trim();
    const correo    = document.getElementById('reg-correo').value.trim().toLowerCase();
    const password  = document.getElementById('reg-password').value;
    const confirmar = document.getElementById('reg-confirmar').value;

    console.log('Datos:', { nombre, telefono, correo, password, confirmar });

    // 1. Campos vacíos
    if (!nombre || !telefono || !correo || !password || !confirmar) {
      mensaje.textContent = '⚠️ Todos los campos son obligatorios';
      return;
    }

    // 2. Formato de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      mensaje.textContent = '❌ El correo está mal escrito';
      return;
    }

    // 3. Teléfono mínimo
    if (telefono.length < 7) {
      mensaje.textContent = '❌ El teléfono debe tener al menos 7 dígitos';
      return;
    }

    // 4. Contraseña mínima
    if (password.length < 4) {
      mensaje.textContent = '❌ La contraseña debe tener al menos 4 caracteres';
      return;
    }

    // 5. Contraseñas iguales
    if (password !== confirmar) {
      mensaje.textContent = '❌ Las contraseñas no coinciden';
      document.getElementById('reg-confirmar').value = '';
      return;
    }

    // 6. Correo no registrado antes
    const usuarios = JSON.parse(localStorage.getItem('usuarios_sig')) || [];
    if (usuarios.some(u => u.correo.toLowerCase() === correo)) {
      mensaje.textContent = '❌ Este correo ya está registrado';
      return;
    }

    // 7. Guardar en localStorage
    usuarios.push({
      nombre,
      telefono,
      correo,
      password,
      rol: 'usuario',
      fechaRegistro: new Date().toISOString()
    });
    localStorage.setItem('usuarios_sig', JSON.stringify(usuarios));

    console.log('✅ Usuario guardado:', usuarios);

    mensaje.style.color = '#40916c';
    mensaje.textContent = '✅ Registro exitoso. Redirigiendo al login...';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });
});