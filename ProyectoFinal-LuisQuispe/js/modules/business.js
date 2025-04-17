import { saveOperation } from "./history.js";
import { creditBalance, debitBalance } from "./wallet.js";

const ID_KEY = "txLastId";

//Se generan los ID de las transacciones de forma secuencial, comenzando por 00001
// Se almacenan en el localStorage para persistir entre sesiones
function getNextTransactionId() {
  const last = parseInt(localStorage.getItem(ID_KEY) || "0", 10) + 1;
  localStorage.setItem(ID_KEY, String(last));
  return String(last).padStart(5, "0");
}

//Convierte y registra la operación de conversión de divisas
export function convertAndSave(amount, from, to, rates) {
  const result = (amount / rates[from]) * rates[to];
  debitBalance(from, amount);
  creditBalance(to, result);
  saveOperation({
    id: getNextTransactionId(),
    date: new Date().toISOString(),
    type: "conversion",
    from,
    to,
    amount,
    rate: rates[to],
    result,
  });
  return result;
}

//Proceso de compra, registramos con ID secuencial.
// Se registra la operación y se actualizan los saldos de las cuentas
export function processPurchase(amount, currency) {
  creditBalance(currency, amount);
  const txId = getNextTransactionId();
  saveOperation({
    id: txId,
    date: new Date().toISOString(),
    type: "compra",
    currency,
    amount,
  });
  return { success: true, transactionId: txId };
}
