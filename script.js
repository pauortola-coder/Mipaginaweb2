// marcador
let puntosLocal = 0;
let puntosVisitante = 0;

const spanLocal = document.getElementById("puntos-local");
const spanVisitante = document.getElementById("puntos-visitante");
const mensaje = document.getElementById("mensaje");

document.querySelectorAll("[data-equipo]").forEach(btn => {
  btn.onclick = function() {
    if (this.dataset.equipo === "local") {
      puntosLocal++;
      spanLocal.textContent = puntosLocal;
    } else {
      puntosVisitante++;
      spanVisitante.textContent = puntosVisitante;
    }
    actualizarMensaje();
  };
});

document.getElementById("reiniciar").onclick = function() {
  puntosLocal = 0;
  puntosVisitante = 0;
  spanLocal.textContent = "0";
  spanVisitante.textContent = "0";
  mensaje.textContent = "Marcador reiniciado!";
};

function actualizarMensaje() {
  if (puntosLocal > puntosVisitante) {
    mensaje.textContent = "Va ganando el Equipo Azul";
  } else if (puntosVisitante > puntosLocal) {
    mensaje.textContent = "Va ganando el Equipo Rojo";
  } else {
    mensaje.textContent = "Empate a " + puntosLocal;
  }
}

// jugadores
const jugadores = [];
const form = document.getElementById("form-jugador");
const inputNombre = document.getElementById("nombre");
const lista = document.getElementById("lista-jugadores");
const aviso = document.getElementById("aviso");

form.onsubmit = function(e) {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  if (!nombre) {
    mostrarAviso("Escribe un nombre", "mal");
    return;
  }

  // comprobar si ya existe
  const existe = jugadores.some(j => j.toLowerCase() === nombre.toLowerCase());
  if (existe) {
    mostrarAviso("Ya esta en la lista", "mal");
    return;
  }

  jugadores.push(nombre);
  inputNombre.value = "";
  mostrarAviso("Añadido: " + nombre, "ok");
  pintarLista();
};

function mostrarAviso(txt, tipo) {
  aviso.textContent = txt;
  aviso.className = "aviso " + tipo;
}

function pintarLista() {
  lista.innerHTML = "";

  if (jugadores.length === 0) {
    const li = document.createElement("li");
    li.className = "vacio";
    li.textContent = "No hay jugadores";
    lista.appendChild(li);
    return;
  }

  jugadores.forEach((nombre, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${nombre}</span>
      <button class="btn rojo" onclick="borrar(${i})">Quitar</button>
    `;
    lista.appendChild(li);
  });
}

function borrar(i) {
  const nombre = jugadores[i];
  jugadores.splice(i, 1);
  mostrarAviso("Eliminado: " + nombre, "ok");
  pintarLista();
}

// iniciar
pintarLista();
