//Se obtiene las cotizaciones de la API de Open Exchange Rates

export async function fetchRates(base = "USD") {
  const url = `https://open.er-api.com/v6/latest/${base}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status !== 200 || data.result !== "success") {
      throw new Error(data["error-type"] || `HTTP ${res.status}`);
    }
    return { rates: data.rates, date: data.time_last_update_utc };
  } catch (err) {
    console.error("fetchRates error:", err);
    Swal.fire("Error", "No pudimos obtener cotizaciones en vivo.", "error");
    return { rates: {}, date: null };
  }
}
