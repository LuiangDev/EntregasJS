const KEY = "walletBalances";

/**
 * Recupera los balances de monedas desde localStorage.
 * Si no hay balances guardados, devuelve un objeto vacío.
 * @returns {Object<string, number>}
 */
export function getBalances() {
  return JSON.parse(localStorage.getItem(KEY)) || {};
}

/**
 * Guarda los balances de monedas en localStorage.
 * @param {Object<string, number>} balances
 */
export function saveBalances(balances) {
  localStorage.setItem(KEY, JSON.stringify(balances));
}

/**
 * Suma un monto al balance de una moneda.
 * @param {string} currency – Código ISO de la moneda (e.g. 'USD')
 * @param {number} amount   – Cantidad a sumar
 */
export function creditBalance(currency, amount) {
  const b = getBalances();
  b[currency] = (b[currency] || 0) + amount;
  saveBalances(b);
}

/**
 * Resta un monto del balance de una moneda.
 * @param {string} currency – Código ISO de la moneda (e.g. 'USD')
 * @param {number} amount   – Cantidad a restar
 */
export function debitBalance(currency, amount) {
  const b = getBalances();
  b[currency] = (b[currency] || 0) - amount;
  saveBalances(b);
}
