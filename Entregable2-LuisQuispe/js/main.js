let usuarios = []; // Array que almacena los usuarios

function AgregarUsuario(event) {
    event.preventDefault();

    // Valores que seran ingresados en el Formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const genero = document.getElementById('genero').value;
    const fechanacimiento = document.getElementById('fechanacimiento').value;
    const nacionalidad = document.getElementById('nacionalidad').value;
    const profesion = document.getElementById('profesion').value;
    const especialidad = document.getElementById('especialidad').value;
    const correo = document.getElementById('correo').value;
    const celular = document.getElementById('celular').value;
    const hobbies = document.getElementById('hobbies').value;
    const cancionfavorita = document.getElementById('cancionfavorita').value;
    const stickerfavorito = document.getElementById('stickerfavorito').files[0];
    const foto = document.getElementById('foto').files[0];

    // Objeto del Usuario
    const usuario = {
        nombre,
        apellido,
        genero,
        fechanacimiento,
        nacionalidad,
        profesion,
        especialidad,
        correo,
        celular,
        hobbies,
        cancionfavorita,
        stickerfavorito:stickerfavorito ? URL.createObjectURL(stickerfavorito) : null, // Convertir la imagen a URL
        foto:foto ? URL.createObjectURL(foto) : null, // Convertir la imagen a URL
    };

    // Agregando toda la información del usuario al Array
    usuarios.push(usuario);

    // Reseteando los campos del Formulario
    document.getElementById('usuarioForm').reset();

    // Actualizando la Lista de Usuarios
    ActualizarListaUsuarios();
}

function ActualizarListaUsuarios() {
    const ListaUsuarios = document.getElementById('ListaUsuarios');
    ListaUsuarios.innerHTML = ''; // Limpiando la lista anterior

    usuarios.forEach((usuario, index) => {
        const usuarioItem = document.createElement('div');
        usuarioItem.className='card bg-base-400 shadow-md mb-4';
        usuarioItem.classList.add('usuario-item');
        usuarioItem.innerHTML = `
            <br><h2 class="card-title">Información Completa de ${usuario.nombre} ${usuario.apellido}</h2><br>
            <p>Género: ${usuario.genero}</p><br>
            <p>Fecha de Nacimiento: ${usuario.fechanacimiento}</p><br>
            <p>Nacionalidad: ${usuario.nacionalidad}</p><br>
            <p>Profesión: ${usuario.profesion}</p><br>
            <p>Especialidad: ${usuario.especialidad}</p><br>
            <p>Correo: ${usuario.correo}</p><br>
            <p>Celular: ${usuario.celular}</p><br>
            <p>Pasatiempos y Hobbies: ${usuario.hobbies}</p><br>
            <p>Canción Favorita: ${usuario.cancionfavorita}</p><br><br>
            ${usuario.stickerfavorito ? `<img src="${usuario.stickerfavorito}" alt="sticker" width="auto">` : ''}<br>
            ${usuario.foto ? `<img src="${usuario.foto}" alt="foto" width="auto">` : ''}<br>
        `;
        ListaUsuarios.appendChild(usuarioItem);
    });
}

function GuardarUsuario() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Los Usuarios fueron guardados correctamente.');
}

function CargarUsuarios() {
    const GuardarUsuario = localStorage.getItem('usuarios');
    if (GuardarUsuario) {
        usuarios = JSON.parse(GuardarUsuario);
        ActualizarListaUsuarios();
    }
}

document.getElementById('usuarioForm').addEventListener('submit', AgregarUsuario);
document.getElementById('GuardarUsuario').addEventListener('click', GuardarUsuario);

// Cargando Usuarios
CargarUsuarios();