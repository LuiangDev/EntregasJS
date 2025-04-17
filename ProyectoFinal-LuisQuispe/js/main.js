import { obtenerTasas } from "./modules/api.js";
import { convertir } from "./modules/business.js";
import { renderForm, mostrarResultado } from "./modules/ui.js";

async function init() {
  //Carga de datos
  const tasas = await obtenerTasas();
  if (!Object.keys(tasas).length) return;

  //Renderización del formulario
  const app = document.getElementById("app");
  renderForm(app, tasas);

  //Configuración del evento de conversión
  document.getElementById("btn-convertir").addEventListener("click", () => {
    const monto = parseFloat(document.getElementById("monto").value);
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;

    // Validación del valor ingresado
    if (isNaN(monto) || monto <= 0) {
      Swal.fire("Atención", "Ingresa un monto válido.", "warning");
      return;
    }

    // Aplicación de la conversión
    const resultado = convertir(monto, tasas[origen], tasas[destino]);
    mostrarResultado(resultado, destino);
  });
}

// Ejecución del simulador
init();
