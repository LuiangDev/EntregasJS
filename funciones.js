//Arreglos donde se detallan los helados y sus precios respectivos
const helados = [
  "Helado de Fresa",
  "Helado de Chocolate",
  "Helado de Menta",
  "Helado de Coco",
  "Helado de Chirimoya",
];
const precios = [10, 20, 40, 50, 55];
let carrito = [];

//Mostrando Catálogo
function mostrarCatalogo() {
  console.log("Helados Disponibles:");
  for (let i = 0; i < helados.length; i++) {
    console.log(`${i + 1}. ${helados[i]} - $${precios[i]}`);
  }
}

//Agregando helados al Carrito
function agregarAlCarrito() {
  let heladoElegido = parseInt(
    prompt("Ingrese el número que hace referencia al helado que desea comprar:")
  );
  let cantidad = parseInt(
    prompt("Ingrese la cantidad de Helados que requiere:")
  );

  if (heladoElegido > 0 && heladoElegido <= helados.length && cantidad > 0) {
    let precioTotal = precios[heladoElegido - 1] * cantidad;
    carrito.push({
      helado: helados[heladoElegido - 1],
      cantidad,
      precioTotal,
    });
    alert(
      `Agregaste ${cantidad} ${
        helados[heladoElegido - 1]
      } al carrito. Costo Acumulado: $${precioTotal}`
    );
  } else {
    alert("Número Inválido. Inténtalo de nuevo.");
  }
}

//Calculando el monto total a pagar
function calcularMontoTotal() {
  let total = carrito.reduce(
    (acumulador, item) => acumulador + item.precioTotal,
    0
  );
  let aplicarDescuento = confirm("¿Cuentas con algún cupón de descuento?");

  if (aplicarDescuento) {
    // Considerando un descuento del 20%
    total *= 0.8;
    alert(`Se aplicó un descuento del 20%. Monto total: $${total.toFixed(2)}`);
  } else {
    alert(`Monto Total a pagar: $${total.toFixed(2)}`);
  }
}

// Descripción para la Simulación en Consola
console.log("HELADERIA JOVANA");
mostrarCatalogo();
agregarAlCarrito();
calcularMontoTotal();
