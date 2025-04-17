//Vista de inicio
// Esta vista se muestra al cargar la aplicación por primera vez.
export function renderInicio(container) {
  // Inyectando HTML
    container.innerHTML = `
      <div class="inicio-container">
        <div class="inicio-content">
          <h1>Bienvenidos a <em>CambioXpress</em></h1>
          <p>
            CambioXpress es tu simulador interactivo de divisas y criptomonedas.
            Comienzas con un saldo inicial de <strong>USD 1 000</strong> y puedes
            comprar distintas monedas, convertirlas en tiempo real y seguir
            tu progreso con estadísticas profesionales.
          </p>
          <button id="btn-start">Iniciar recorrido</button>
        </div>
        <div class="inicio-image">
          <img src="assets/home.jpg" alt="Gráfico de divisas" />
        </div>
      </div>
    `;
    // Agregando evento al botón de inicio
    // Al hacer clic, redirige a la sección de saldo y recarga la página
    document.getElementById('btn-start').addEventListener('click', () => {
      location.hash = '#saldo';
      location.reload();
    });
  }
  