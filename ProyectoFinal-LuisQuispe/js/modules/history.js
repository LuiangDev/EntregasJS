const KEY = 'txHistory';

// Guarda una operación en el historial.
export function saveOperation(op) {
  const hist = JSON.parse(localStorage.getItem(KEY)) || [];
  hist.unshift(op);
  localStorage.setItem(KEY, JSON.stringify(hist));
}

//Recupera el historial de operaciones.
// Si no hay historial, devuelve un array vacío.
export function getHistory() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
