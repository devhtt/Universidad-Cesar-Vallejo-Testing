// Mostrar formulario de login
function mostrarLogin() {
  document.getElementById("formulario-login").classList.remove("oculto");
  document.getElementById("formulario-registro").classList.add("oculto");

  limpiarErrores();
}

// Mostrar formulario de registro
function mostrarRegistro() {
  document.getElementById("formulario-registro").classList.remove("oculto");
  document.getElementById("formulario-login").classList.add("oculto");

  limpiarErrores();
}

// Iniciar sesión
function iniciarSesion() {
  const correo = document.getElementById("login-correo").value;
  const password = document.getElementById("login-password").value;

  const errorCorreo = document.getElementById("error-correo");
  const errorPassword = document.getElementById("error-password");

  errorCorreo.innerText = "";
  errorPassword.innerText = "";

  // Obtener usuarios guardados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(user => user.correo === correo);

  if (!usuario) {
    errorCorreo.innerText = "Correo no registrado";
    return;
  }

  if (usuario.contraseña !== password) {
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }

  // Guardar nombre y redirigir
  localStorage.setItem("usuarioNombre", usuario.nombre);
  window.location.href = "dashboard.html";
}

// Registrar nuevo usuario
function registrar() {
  const nombre = document.getElementById("registro-nombre").value;
  const correo = document.getElementById("registro-correo").value;
  const password = document.getElementById("registro-password").value;

  const errorCorreo = document.getElementById("error-registro-correo");
  const errorPassword = document.getElementById("error-registro-password");

  errorCorreo.innerText = "";
  errorPassword.innerText = "";

  if (!correo.includes("@")) {
    errorCorreo.innerText = "Correo inválido";
    return;
  }

  if (password.length < 4) {
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }

  // Obtener usuarios existentes
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Validar que no esté registrado
  const yaExiste = usuarios.some(user => user.correo === correo);
  if (yaExiste) {
    errorCorreo.innerText = "El correo ya está registrado";
    return;
  }

  // Agregar nuevo usuario
  usuarios.push({ nombre, correo, contraseña: password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Guardar nombre (opcional)
  localStorage.setItem("usuarioNombre", nombre);

  mostrarLogin(); // ir al login
}

// Limpiar todos los errores
function limpiarErrores() {
  document.getElementById("error-correo").innerText = "";
  document.getElementById("error-password").innerText = "";
  document.getElementById("error-registro-correo").innerText = "";
  document.getElementById("error-registro-password").innerText = "";
}

// Ir al dashboard si el usuario está logueado
function irADashboard() {
  const nombre = localStorage.getItem("usuarioNombre");
  if (nombre) {
    window.location.href = "dashboard.html";
  } else {
    alert("Primero inicia sesión.");
  }
}

// Mostrar mensaje de bienvenida personalizado si el usuario está logueado
window.addEventListener("DOMContentLoaded", function() {
  const nombre = localStorage.getItem("usuarioNombre");
  if (nombre) {
    const bienvenida = document.getElementById("bienvenida-usuario");
    if (bienvenida) {
      bienvenida.textContent = `¡Bienvenido/a, ${nombre}! Gestiona tu aprendizaje desde cualquier lugar y en cualquier momento gracias a nuestra plataforma digital.`;
    }
  }
});
