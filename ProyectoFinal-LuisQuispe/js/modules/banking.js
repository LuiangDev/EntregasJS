//Se validan los códigos de las cuentas bancarias,IBAN y SWIFT
export function validateSwift(code) {
  return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(code);
}
export function validateIban(iban) {
  return /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban);
}
