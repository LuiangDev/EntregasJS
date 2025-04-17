/**
 //Función para obtener las tasas de cambio desde un archivo JSON
 * @returns {Promise<Record<string, number>>}
 */
export async function obtenerTasas() {
  try {
    const respuesta = await fetch("data/datos.json");
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    const tasas = await respuesta.json();
    return tasas;
  } catch (error) {
    // Mensaje al usuario, caso de error
    Swal.fire({
      icon: "error",
      title: "Error de datos",
      text: "No pudimos cargar las tasas de cambio.",
    });
    return {};
  }
}
