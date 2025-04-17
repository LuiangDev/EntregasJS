//Módulo para renderizar el sidebar y la navegación de la aplicación
//Importa las funciones de renderizado de las vistas
//y el módulo de router para manejar la navegación
const menuItems = [
    { hash: '#inicio',       label: 'Inicio'        },
    { hash: '#saldo',        label: 'Saldo Actual'  },
    { hash: '#conversiones', label: 'Conversión'    },
    { hash: '#dashboard',    label: 'Dashboard'     },
    { hash: '#historiales',  label: 'Historiales'   },
  ];
  
/// Renderiza el sidebar y el menú de navegación
  export function renderSidebar(root) {
    //Inyectamos HTML en el contenedor
    root.innerHTML = `
      <aside id="sidebar">
        <img src="assets/logo.png" alt="Logo"/>
        <nav id="nav"></nav>
      </aside>
      <button id="sidebar-toggle" aria-label="Menu">☰</button>
      <main id="view"></main>
    `;
  
    const sidebar = document.getElementById('sidebar');
    const toggle  = document.getElementById('sidebar-toggle');
    const nav     = document.getElementById('nav');
  
    //Construimos menú
    menuItems.forEach(item => {
      const btn = document.createElement('button');
      btn.textContent = item.label;
      btn.onclick = () => {
        //En móvil, cerramos sidebar tras navegar
        sidebar.classList.remove('open');
        if (item.hash === '#inicio') {
          location.hash = '#inicio';
          location.reload();
        } else {
          location.hash = item.hash;
        }
      };
      nav.appendChild(btn);
    });
  
    //Toggle hamburguesa
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  
    //Resaltamos el botón activo según la navegación
    function highlight() {
      Array.from(nav.children).forEach((b,i) => {
        b.classList.toggle(
          'active',
          location.hash === menuItems[i].hash
        );
      });
    }
    window.addEventListener('hashchange', highlight);
    highlight();
  }
  