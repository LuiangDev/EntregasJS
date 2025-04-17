/**
 * Devuelve un formateador de divisas para el código y locale dados.
 * El formateador devuelve el símbolo de la divisa y el número formateado.
 * Por ejemplo, para USD y es-PE devuelve '$ 1,234.56'
 *
 * @param {string} code   – Código ISO de la divisa (p.ej. 'USD','EUR','PEN')
 * @param {string} locale – Locale para separar miles/decimales (p.ej. 'es-PE')
 * @returns {{ format: (n:number) => string }}
 */
export function getFormatter(code, locale = "es-PE") {
  //Obtenemos el símbolo real
  const rawSym = window.getSymbolFromCurrency(code);
  //Si no existe el símbolo, usamos el código de la divisa
  const symbol = rawSym != null ? rawSym : code + " ";

  //Creamos el formateador de números
  const numberFmt = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  //Devolvemos el formateador de divisas
  //El formateador devuelve el símbolo y el número formateado
  return {
    format(amount) {
      return `${symbol}${numberFmt.format(amount)}`;
    },
  };
}
