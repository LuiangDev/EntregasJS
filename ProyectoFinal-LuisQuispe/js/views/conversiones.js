import { getBalances } from "../modules/wallet.js";
import { getFormatter } from "../modules/format.js";
import { convertAndSave } from "../modules/business.js";

//Renderizamos la vista de Conversiones:
//Al cargar, muestra los últimos 5 movimientos de tipo 'conversion'

export function renderConversiones(container) {
  const balances = getBalances();
  const allCurr = Object.keys(window.APP_RATES);

  // Generando opciones
  const optsFrom = Object.entries(balances)
    .filter(([, amt]) => amt > 0)
    .map(([c]) => `<option value="${c}">${c}</option>`)
    .join("");
  const optsTo = allCurr
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  // Inyectando HTML
  container.innerHTML = `
    <div class="card">
      <h2>Conversión</h2>

      <label for="conv-from">Moneda Origen</label>
      <select id="conv-from">
        <option value="" disabled selected>Selecciona moneda origen</option>
        ${optsFrom}
      </select>

      <label for="conv-to">Moneda Destino</label>
      <select id="conv-to">
        <option value="" disabled selected>Selecciona moneda destino</option>
        ${optsTo}
      </select>

      <label for="conv-amt">Monto a convertir</label>
      <input id="conv-amt" type="number" placeholder="Ingresa monto a convertir"/>

      <button id="btn-convert">Convertir</button>

      <div id="conv-result" style="margin-top:1rem; font-weight:bold;"></div>
    </div>

    <div class="card">
      <h3>Historial Reciente</h3>
      <table class="history-table">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Operación</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody id="history-body">
          <!-- se llenará dinámicamente -->
        </tbody>
      </table>
    </div>
  `;

  const body = document.getElementById("history-body");

  //Función que llena el historial reciente
  function updateHistory() {
    const raw = JSON.parse(localStorage.getItem("txHistory") || "[]")
      .filter((op) => op.type === "conversion")
      .slice(0, 5);
    if (!raw.length) {
      body.innerHTML = `<tr><td colspan="3">Sin datos de conversiones.</td></tr>`;
      return;
    }
    body.innerHTML = raw
      .map((op) => {
        const dateStr = new Date(op.date).toLocaleString("es-PE", {
          dateStyle: "short",
          timeStyle: "short",
        });
        const label = `${op.from} → ${op.to}`;
        const fmtRes = getFormatter(op.to);
        return `
        <tr>
          <td>${dateStr}</td>
          <td>${label}</td>
          <td>${fmtRes.format(op.result)}</td>
        </tr>
      `;
      })
      .join("");
  }

  //Llamada inicial para mostrar historial al entrar
  updateHistory();

  //Handler de conversión
  document.getElementById("btn-convert").onclick = () => {
    const fromCode = document.getElementById("conv-from").value;
    const toCode = document.getElementById("conv-to").value;
    const amount = parseFloat(document.getElementById("conv-amt").value);
    const currentBalance = balances[fromCode] || 0;
    const fmtFrom = getFormatter(fromCode);
    const fmtTo = getFormatter(toCode);

    //Validaciones
    if (!fromCode) {
      return Swal.fire("Atención", "Selecciona la moneda origen.", "warning");
    }
    if (!toCode) {
      return Swal.fire("Atención", "Selecciona la moneda destino.", "warning");
    }
    if (fromCode === toCode) {
      return Swal.fire(
        "Atención",
        "No puedes convertir la misma moneda.",
        "warning"
      );
    }
    if (isNaN(amount) || amount <= 0) {
      return Swal.fire("Atención", "Ingresa un monto válido.", "warning");
    }
    if (amount > currentBalance) {
      return Swal.fire(
        "Saldo insuficiente",
        `Intentaste convertir ${fmtFrom.format(
          amount
        )}, pero tu saldo es ${fmtFrom.format(currentBalance)}.`,
        "warning"
      );
    }

    //Ejecución de la conversión
    const result = convertAndSave(amount, fromCode, toCode, window.APP_RATES);

    //Mostrando resultado
    document.getElementById(
      "conv-result"
    ).textContent = `Resultado: ${fmtTo.format(result)}`;
    Swal.fire(
      "Conversión exitosa",
      `Has obtenido ${fmtTo.format(result)}`,
      "success"
    );

    //Refrescando saldo en memoria para siguientes operaciones
    Object.assign(balances, getBalances());

    //Actualizando historial
    updateHistory();
  };
}
