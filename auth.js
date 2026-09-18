// ============================================
// AUTENTICACIÓN - SIG UBATÉ
// ============================================

// Usuario admin por defecto
const USUARIO_DEFAULT = {
  nombre: 'Administrador SIG',
  telefono: '0000000000',
  correo: 'admin@ubate.gov.co',
  password: '1234',
  rol: 'administrador',
  fechaRegistro: new Date().toISOString()
};

// Inicializar lista de usuarios si no existe
if (!localStorage.getItem('usuarios_sig')) {
  localStorage.setItem('usuarios_sig', JSON.stringify([USUARIO_DEFAULT]));
}

// Si ya hay sesión activa, ir directo al mapa
if (localStorage.getItem('sesion_sig')) {
  window.location.href = 'index.html';
}

// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');
  const mensaje = document.getElementById('mensaje-error');

  if (!form) {
    console.error('❌ No se encontró el formulario con id "form-login"');
    return;
  }

  console.log('✅ auth.js cargado correctamente');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('📝 Login capturado');

    mensaje.textContent = '';
    mensaje.style.color = '#c1121f';

    const entrada = document.getElementById('login-usuario').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    console.log('Datos login:', { entrada, password });

    // 1. Campos vacíos
    if (!entrada || !password) {
      mensaje.textContent = '⚠️ Completa todos los campos';
      return;
    }

    // 2. Validar formato si es correo
    const esCorreo = entrada.includes('@');
    if (esCorreo) {
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexCorreo.test(entrada)) {
        mensaje.textContent = '❌ El correo está mal escrito (formato inválido)';
        return;
      }
    }

    // 3. Buscar usuario por correo O por nombre
    const usuarios = JSON.parse(localStorage.getItem('usuarios_sig')) || [];
    console.log('Usuarios en BD:', usuarios);

    const usuarioEncontrado = usuarios.find(u =>
      u.correo.toLowerCase() === entrada ||
      u.nombre.toLowerCase() === entrada
    );

    // 4. No existe
    if (!usuarioEncontrado) {
      mensaje.textContent = esCorreo
        ? '❌ El correo no está registrado'
        : '❌ El nombre de usuario no está registrado';
      setTimeout(() => {
        if (confirm('No estás registrado. ¿Deseas crear una cuenta?')) {
          window.location.href = 'registro.html';
        }
      }, 400);
      return;
    }

    // 5. Contraseña incorrecta
    if (usuarioEncontrado.password !== password) {
      mensaje.textContent = '❌ Contraseña incorrecta';
      document.getElementById('login-password').value = '';
      return;
    }

    // 6. Login correcto
    const sesion = {
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
      rol: usuarioEncontrado.rol || 'usuario',
      hora: new Date().toISOString()
    };
    localStorage.setItem('sesion_sig', JSON.stringify(sesion));

    console.log('✅ Sesión creada:', sesion);

    mensaje.style.color = '#40916c';
    mensaje.textContent = `✅ Bienvenido, ${usuarioEncontrado.nombre}`;

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
  });
});