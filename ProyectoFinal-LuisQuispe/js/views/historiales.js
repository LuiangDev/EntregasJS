import { getHistory } from "../modules/history.js";
import { getFormatter } from "../modules/format.js";

// Renderizamos la vista de Historiales:
// Al cargar, muestra el historial de operaciones
export function renderHistoriales(container) {
  const history = getHistory();

  //Inyectando HTML
  container.innerHTML = `
    <div class="card">
      <h2>Historial General</h2>

      <label for="hist-filter">Mostrar</label>
      <select id="hist-filter">
        <option value="all">Todo</option>
        <option value="conversion">Conversiones</option>
        <option value="compra">Compras</option>
      </select>

      <table class="history-table" style="margin-top:1rem;">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha y Hora</th>
            <th>Tipo</th>
            <th>Detalle</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody id="hist-body">
          <!-- se llenará dinámicamente -->
        </tbody>
      </table>
    </div>
  `;

  const body = document.getElementById("hist-body");
  const filter = document.getElementById("hist-filter");

  // Mapeo de tipos de operación a etiquetas
  function updateTable(type) {
    const ops = history.filter((op) => type === "all" || op.type === type);
    if (!ops.length) {
      body.innerHTML = `<tr><td colspan="5">No hay datos.</td></tr>`;
      return;
    }
    body.innerHTML = ops
      .map((op) => {
        const dateStr = new Date(op.date).toLocaleString("es-PE", {
          dateStyle: "short",
          timeStyle: "short",
        });

        //Adicional: Mapeo del tipo con acento en “Conversión”
        const typeLabel = op.type === "conversion" ? "Conversión" : "Compra";

        let detail, result;
        if (op.type === "conversion") {
          detail = `${op.from} → ${op.to} (${op.amount})`;
          result = getFormatter(op.to).format(op.result);
        } else {
          detail = `Compra ${op.currency}`;
          result = getFormatter(op.currency).format(op.amount);
        }
        return `
        <tr>
          <td>${op.id}</td>
          <td>${dateStr}</td>
          <td>${typeLabel}</td>
          <td>${detail}</td>
          <td>${result}</td>
        </tr>
      `;
      })
      .join("");
  }

  // Inicializamos la tabla con todas las operaciones
  updateTable("all");
  filter.addEventListener("change", (e) => updateTable(e.target.value));
}
