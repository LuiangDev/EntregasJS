/**
 * Renderización del formulario de conversión y del contenedor de resultado
 * @param {HTMLElement} container – Nodo donde se va inyectar el HTML
 * @param {Record<string, number>} tasas – Objeto con divisas y sus tasas
 */

export function renderForm(container, tasas) {
  const opciones = Object.keys(tasas)
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  container.innerHTML = `
      <div class="card">
        <input id="monto" type="number" placeholder="Monto" />
        <select id="origen">${opciones}</select>
        <select id="destino">${opciones}</select>
        <button id="btn-convertir">Convertir</button>
      </div>
      <div id="resultado" class="card"></div>
    `;
}

/**
 * Resultados para la pantalla y el modal.
 * @param {number} valor – Monto convertido.
 * @param {string} destino – Código de la divisa destino.
 */
export function mostrarResultado(valor, destino) {
  const cont = document.getElementById("resultado");
  cont.textContent = `Resultado: ${valor.toFixed(4)} ${destino}`;

  Swal.fire({
    icon: "success",
    title: "Conversión exitosa",
    text: `Tienes ${valor.toFixed(4)} ${destino}`,
  });
}
