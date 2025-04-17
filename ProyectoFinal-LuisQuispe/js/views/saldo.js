import { getBalances } from "../modules/wallet.js";
import { getFormatter } from "../modules/format.js";
import { processPurchase } from "../modules/business.js";

// Renderizamos la vista de Saldo:
// Al cargar, muestra el saldo de monedas y permite comprar más
export function renderSaldo(container) {
  const balances = getBalances();
  // Creamos un Intl.DisplayNames en español para descripciones
  const dispNames = new Intl.DisplayNames(["es"], { type: "currency" });

  // Filtramos y construimos filas
  const rows = Object.entries(balances)
    .map(([code, amt]) => {
      const name = dispNames.of(code) || code; // Descripción de la moneda
      // Formatter que mostrará símbolos de los tipos de monedas
      const formatter = getFormatter(code, "es-PE");
      return `
        <tr>
          <td><strong>${code}</strong> – ${name}</td>
          <td>${formatter.format(amt)}</td>
        </tr>
      `;
    })
    .join("");
  // Inyectamos el HTML en el contenedor
  container.innerHTML = `
    <div class="card">
      <h2>Mi Saldo</h2>
      <table class="saldo-table">
        <thead>
          <tr>
            <th>Tipo de Moneda</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          ${rows || `<tr><td colspan="2">Sin fondos.</td></tr>`}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>Comprar Moneda</h2>
      <label for="buy-currency">Tipo de Moneda</label>
      <select id="buy-currency">
        <option value="" disabled selected>Selecciona moneda</option>
        ${Object.keys(window.APP_RATES)
          .map((c) => {
            const desc = dispNames.of(c) || c;
            return `<option value="${c}">${c} – ${desc}</option>`;
          })
          .join("")}
      </select>

      <label for="buy-amount">Monto a comprar</label>
      <input id="buy-amount" type="number" placeholder="Ingresa monto"/>

      <button id="btn-buy-main">Comprar</button>
    </div>
  `;

  // Lógica de compra
  document.getElementById("btn-buy-main").onclick = () => {
    const currency = document.getElementById("buy-currency").value;
    const amount = parseFloat(document.getElementById("buy-amount").value);

    if (!currency) {
      return Swal.fire("Atención", "Selecciona una moneda.", "warning");
    }
    if (isNaN(amount) || amount <= 0) {
      return Swal.fire("Atención", "Monto inválido.", "warning");
    }

    const { transactionId } = processPurchase(amount, currency);
    Swal.fire({
      icon: "success",
      title: "Compra exitosa",
      text: `Transacción #${transactionId}`,
    });

    // Refrescar la vista para mostrar el nuevo saldo
    renderSaldo(container);
  };
}
