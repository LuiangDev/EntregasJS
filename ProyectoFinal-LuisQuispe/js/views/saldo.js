import { getBalances } from "../modules/wallet.js";
import { getFormatter } from "../modules/format.js";
import { processPurchase } from "../modules/business.js";
import { validateIban, validateSwift } from "../modules/banking.js"; // Validadores externos

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

      <label for="buy-iban">CBU / IBAN</label>
      <input id="buy-iban" type="text" value="ES9121000418450200051332"/>

      <label for="buy-swift">Código SWIFT</label>
      <input id="buy-swift" type="text" value="ABCDUS33"/>

      <small style="color: gray; display:block; margin-top: 0.5rem;">
        Los campos CBU y SWIFT han sido precargados con valores válidos. Puedes editarlos si deseas.
      </small>

      <button id="btn-buy-main">Comprar</button>
    </div>
  `;

  // Lógica de compra con validaciones extendidas
  document.getElementById("btn-buy-main").onclick = () => {
    const currency = document.getElementById("buy-currency").value;
    const amount   = parseFloat(document.getElementById("buy-amount").value);
    const iban     = document.getElementById("buy-iban").value.trim();
    const swift    = document.getElementById("buy-swift").value.trim();

    // Validación de selección de moneda
    if (!currency) {
      return Swal.fire("Atención", "Selecciona una moneda.", "warning");
    }

    // Validación de monto válido
    if (isNaN(amount) || amount <= 0) {
      return Swal.fire("Atención", "Monto inválido.", "warning");
    }

    // Validación de CBU/IBAN (formato aproximado real)
    if (!validateIban(iban)) {
      return Swal.fire("Atención", "CBU/IBAN inválido.", "warning");
    }

    // Validación de código SWIFT (formato estándar)
    if (!validateSwift(swift)) {
      return Swal.fire("Atención", "Código SWIFT inválido.", "warning");
    }

    // Ejecutamos la compra y generamos la transacción
    const { transactionId } = processPurchase(amount, currency);
    const formatter = getFormatter(currency, "es-PE");

    // Mostramos alerta de confirmación
    Swal.fire({
      icon: "success",
      title: "Compra exitosa",
      html: `Transacción #${transactionId}<br>Moneda: <strong>${currency}</strong><br>CBU: ${iban}<br>SWIFT: ${swift}`,
    });

    // Refrescamos la vista para mostrar el nuevo saldo
    renderSaldo(container);
  };
}
