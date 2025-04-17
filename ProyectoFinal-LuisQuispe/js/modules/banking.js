//Se validan los códigos de las cuentas bancarias,IBAN y SWIFT
export function validateSwift(input) {
  return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(input.trim().toUpperCase());
}
export function validateIban(input) {
  return /^[A-Z]{2}\d{20,30}$/.test(input.trim().toUpperCase());
}
