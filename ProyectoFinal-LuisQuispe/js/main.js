import { renderSidebar } from "./sidebar.js";
import { initRouter } from "./router.js";
import { fetchRates } from "./modules/api.js";
import { getBalances, creditBalance } from "./modules/wallet.js";
import { renderInicio } from "./views/inicio.js";

document.addEventListener("DOMContentLoaded", async () => {
  //Saldo inicial de 1000 USD
  if (Object.keys(getBalances()).length === 0) {
    creditBalance("USD", 1000);
  }

  //Renderizamos vista de inicio
  if (!location.hash || location.hash === "#inicio") {
    const app = document.getElementById("app");
    app.innerHTML = "";
    renderInicio(app);
    return;
  }

  //Renderizamos vista de sidebar
  renderSidebar(document.getElementById("app"));

  //Cargamos cotizaciones y símbolos de monedas
  const { rates, date } = await fetchRates("USD");
  if (!date) {
    window.APP_RATES = {};
    window.CURRENCY_SYMBOLS = {};
  } else {
    window.APP_RATES = rates;
    const makeSymbol = (code, locale) => {
      let parts = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: code,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
      }).formatToParts(0);
      let sym = parts.find((p) => p.type === "currency")?.value;
      if (!sym || sym === code) {
        parts = new Intl.NumberFormat("en", {
          style: "currency",
          currency: code,
          currencyDisplay: "narrowSymbol",
          minimumFractionDigits: 2,
        }).formatToParts(0);
        sym = parts.find((p) => p.type === "currency")?.value;
      }
      return sym && sym !== code ? sym : code + " ";
    };
    window.CURRENCY_SYMBOLS = Object.fromEntries(
      Object.keys(rates).map((code) => [code, makeSymbol(code, "es-PE")])
    );
  }

 //Inicializamos el router
  initRouter();
});
