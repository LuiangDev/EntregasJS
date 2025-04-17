//Pie chart para balances por moneda.
export function renderPie(canvasId, balances) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(balances),
      datasets: [{ data: Object.values(balances) }],
    },
  });
}

//Doughnut chart para conteo de tipos de transacción.
export function renderDoughnut(canvasId, counts) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts) }],
    },
  });
}

//Gráfico de barras apiladas por mes:
//eje X: meses (últimos 6 meses)
//eje Y: monto convertido (acumulado por mes)

export function renderStackedBarMonthly(canvasId, conversions, purchases) {
  // obtener meses (últimos 6)
  // y acumulados por mes
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d);
  }
  const labels = months.map((d) =>
    d.toLocaleString("es-PE", { month: "short", year: "numeric" })
  );
  // inicializar datos
  const convData = labels.map(() => 0);
  const purData = labels.map(() => 0);

  //convertir fechas a índices de meses
  // y acumular montos
  conversions.forEach((op) => {
    const d = new Date(op.date);
    const idx = months.findIndex(
      (m) =>
        m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth()
    );
    if (idx >= 0) convData[idx] += op.amount;
  });
  purchases.forEach((op) => {
    const d = new Date(op.date);
    const idx = months.findIndex(
      (m) =>
        m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth()
    );
    if (idx >= 0) purData[idx] += op.amount;
  });

  // crear gráfico
  // y renderizarlo
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Conversiones",
          data: convData,
          backgroundColor: "rgba(3,102,214,0.6)",
        },
        {
          label: "Compras",
          data: purData,
          backgroundColor: "rgba(255,159,64,0.6)",
        },
      ],
    },
    options: {
      scales: {
        x: { stacked: true, title: { display: true, text: "Mes" } },
        y: { stacked: true, title: { display: true, text: "Volumen" } },
      },
    },
  });
}

//Radar chart para frecuencia de uso por moneda (top 6).
export function renderRadarFrequency(canvasId, conversions) {
  // contando apariciones de destino
  const freq = conversions.reduce((acc, op) => {
    acc[op.to] = (acc[op.to] || 0) + 1;
    return acc;
  }, {});
  // ordenando y tomando top 6
  const entries = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const labels = entries.map((e) => e[0]);
  const data = entries.map((e) => e[1]);

  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [{ label: "Frecuencia", data }],
    },
    options: {
      scales: {
        r: { angleLines: { display: false }, beginAtZero: true },
      },
    },
  });
}

//Polar chart para tasa promedio por moneda (top 6).
// Se calcula la tasa promedio de cada moneda
export function renderPolarAvgRate(canvasId, conversions) {
  const sums = {},
    counts = {};
  conversions.forEach((op) => {
    sums[op.to] = (sums[op.to] || 0) + op.rate;
    counts[op.to] = (counts[op.to] || 0) + 1;
  });
  const labels = Object.keys(sums);
  const data = labels.map((c) => sums[c] / counts[c]);

  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "polarArea",
    data: {
      labels,
      datasets: [{ data }],
    },
  });
}

//Bubble chart para monto convertido por operación (top 6).
// Se calcula el monto convertido por operación
export function renderBubble(canvasId, conversions) {
  // convertiendo a datos de gráfico
  const data = conversions.map((op, i) => ({
    x: i,
    y: op.result,
    r: Math.sqrt(op.rate) * 2,
  }));
  const labels = conversions.map((op) =>
    new Date(op.date).toLocaleDateString("es-PE", {
      month: "short",
      day: "numeric",
    })
  );
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "bubble",
    data: {
      labels,
      datasets: [{ label: "Operaciones", data }],
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Operación (índice)" } },
        y: { title: { display: true, text: "Monto convertido" } },
      },
    },
  });
}
