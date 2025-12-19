/* ============================= */
/* SELECCIÓN DE ELEMENTOS */
/* ============================= */
const ramos = document.querySelectorAll(".ramo");
const sctTexto = document.getElementById("sct");
const barra = document.getElementById("barra");

/* ============================= */
/* ACTUALIZAR SCT Y BARRA */
/* ============================= */
function actualizarProgreso() {
  let totalSCT = 0;

  ramos.forEach(ramo => {
    if (ramo.classList.contains("aprobado")) {
      totalSCT += parseInt(ramo.dataset.sct);
    }
  });

  sctTexto.textContent = totalSCT;
  barra.style.width = (totalSCT / 300) * 100 + "%";

  verificarBloqueos();
}

/* ============================= */
/* VERIFICAR PRERREQUISITOS */
/* ============================= */
function verificarBloqueos() {
  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prereq;

    if (!prereq) return;

    const aprobado = localStorage.getItem(prereq) === "true";

    if (aprobado) {
      ramo.classList.remove("bloqueado");
    } else {
      ramo.classList.add("bloqueado");
      ramo.classList.remove("aprobado");
      localStorage.setItem(ramo.dataset.id, "false");
    }
  });
}

/* ============================= */
/* CARGAR ESTADO GUARDADO */
/* ============================= */
ramos.forEach(ramo => {
  const id = ramo.dataset.id;

  if (localStorage.getItem(id) === "true") {
    ramo.classList.add("aprobado");
  }

  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;

    ramo.classList.toggle("aprobado");
    localStorage.setItem(id, ramo.classList.contains("aprobado"));

    actualizarProgreso();
  });
});

/* ============================= */
/* INICIALIZAR */
/* ============================= */
actualizarProgreso();

