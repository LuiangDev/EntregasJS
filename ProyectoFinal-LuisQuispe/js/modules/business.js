/**
 * Conversión de un monto de origen a destino según las tasas correspondientes
 * @param {number} monto – Valor en la divisa de origen.
 * @param {number} tasaOrigen – Tasa relativa a USD de la divisa de origen.
 * @param {number} tasaDestino – Tasa relativa a USD de la divisa destino.
 * @returns {number}
 */
export function convertir(monto, tasaOrigen, tasaDestino) {
  // Fórmula aplicada: (monto ÷ tasaOrigen) × tasaDestino
  return (monto / tasaOrigen) * tasaDestino;
}
