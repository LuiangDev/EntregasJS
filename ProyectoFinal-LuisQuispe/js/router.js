import { renderSaldo } from "./views/saldo.js";
import { renderConversiones } from "./views/conversiones.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderHistoriales } from "./views/historiales.js";

//Rutas de la app
const routes = {
  "#saldo": renderSaldo,
  "#conversiones": renderConversiones,
  "#dashboard": renderDashboard,
  "#historiales": renderHistoriales,
};

/// Inicializamos el router
export function initRouter() {
  window.addEventListener("hashchange", loadView);
  loadView(); // Primera carga
}

// Cargamos la vista según la navegación
// Si no hay navegación, cargamos la vista de saldo por defecto
function loadView() {
  const hash = window.location.hash || "#saldo";
  const render = routes[hash] || renderSaldo;
  // Limpiamos y renderizamos la vista
  document.getElementById("view").innerHTML = "";
  render(document.getElementById("view"));
}
