import { getBalances } from "../modules/wallet.js";
import { getHistory } from "../modules/history.js";
import {
  renderPie,
  renderDoughnut,
  renderStackedBarMonthly,
  renderRadarFrequency,
  renderPolarAvgRate,
  renderBubble,
} from "../ui/chartRenderer.js";

//Dashboard de la app
// Muestra un resumen de las operaciones y balances

export function renderDashboard(container) {
  const balances = getBalances();
  const allOps = getHistory();
  const conversions = allOps.filter((op) => op.type === "conversion");
  const purchases = allOps.filter((op) => op.type === "compra");

  //conteo de tipos
  const counts = allOps.reduce((acc, op) => {
    acc[op.type] = (acc[op.type] || 0) + 1;
    return acc;
  }, {});

  // Inyectando HTML
  container.innerHTML = `
    <!-- Fila 1 -->
    <div class="dashboard-row">
      <div class="card">
        <h2>Distribución de Saldo</h2>
        <canvas id="chart-balances" style="max-height:250px;"></canvas>
      </div>
      <div class="card">
        <h2>Tipos de Transacción</h2>
        <canvas id="chart-types" style="max-height:250px;"></canvas>
      </div>
    </div>
    <!-- Fila 2 -->
    <div class="dashboard-row">
      <div class="card">
        <h2>Volumen Mensual (6 meses)</h2>
        <canvas id="chart-monthly" style="max-height:250px;"></canvas>
      </div>
      <div class="card">
        <h2>Frecuencia por Moneda</h2>
        <canvas id="chart-radar" style="max-height:250px;"></canvas>
      </div>
    </div>
    <!-- Fila 3 -->
    <div class="dashboard-row" style="margin-top:1rem;">
      <div class="card">
        <h2>Tasa Promedio por Destino</h2>
        <canvas id="chart-polar" style="max-height:250px;"></canvas>
      </div>
      <div class="card">
        <h2>Burbujas: Monto vs Tasa</h2>
        <canvas id="chart-bubble" style="max-height:250px;"></canvas>
      </div>
    </div>
  `;

  // Gráficos
  //Pie chart de balances
  renderPie("chart-balances", balances);

  //Doughnut chart de tipos de transacción
  renderDoughnut("chart-types", {
    Conversiones: counts.conversion || 0,
    Compras: counts.compra || 0,
  });

  //Stacked Bar mensual
  renderStackedBarMonthly("chart-monthly", conversions, purchases);

  //Radar frecuencia
  renderRadarFrequency("chart-radar", conversions);

  //Polar chart de tasa promedio por destino
  renderPolarAvgRate("chart-polar", conversions);

  //Bubble chart de monto vs tasa
  renderBubble("chart-bubble", conversions);
}
