// Lee la lista de usuarios guardad en el navegador
function leerUsuarios(){
    return JSON.parse(localStorage.getItem('patitasUsuarios')) || [];
}

// Dibuja las filas de la tabla con los usurios guaraddos

function listarUsarios(){
    const tbody = document.getElementById('usuarios-tbody');
    const usuarios = leerUsuarios();

        tbody.innerHTML = usuarios.map(u => `
        <tr>
            <td>${u.run}</td>
            <td>${u.nombre} ${u.apellidos}</td>
            <td>${u.correo}</td>
            <td>${u.rol}</td>
            <td>
                <button class="btn btn-light btn-small" type="button" onclick="verUsuario('${u.run}')">Ver</button>
                <button class="btn btn-orange btn-small" type="button" onclick="editarUsuario('${u.run}')">Editar</button>
            </td>
        </tr>`).join('');
}

listarUsarios();

// Guarda el RUN del usuario que estamos editando, o null si estamos creando uno nuevo

let runEditando = null;

// Mostrar formulario

function nuevoUsuario(){
   
    runEditando = null;
    document.getElementById('titulo-formulario').textContent = 'Nuevo usuario';
    document.getElementById('usuario-run').disabled = false;
    document.getElementById('form-gestion-usuario').reset();
    document.getElementById('panel-formulario').hidden = false;

}

//Esconde el forulario

function cerrarFormulario(){
    document.getElementById('panel-formulario').hidden = true;
}

// Muestra el formulario ya lleno con los datos de un usuario, para editarlo
function editarUsuario(run) {
    const usuario = leerUsuarios().find(u => u.run === run);
    if (!usuario) return;

    runEditando = run;
    document.getElementById('titulo-formulario').textContent = 'Editar usuario';

    document.getElementById('usuario-run').value = usuario.run;
    document.getElementById('usuario-run').disabled = true;
    document.getElementById('usuario-nombre').value = usuario.nombre;
    document.getElementById('usuario-apellidos').value = usuario.apellidos;
    document.getElementById('usuario-correo').value = usuario.correo;
    document.getElementById('usuario-clave').value = usuario.clave;
    document.getElementById('usuario-rol').value = usuario.rol;
    document.getElementById('usuario-region').value = usuario.region;
    cargarComunasUsuario();
    document.getElementById('usuario-comuna').value = usuario.comuna;
    document.getElementById('usuario-direccion').value = usuario.direccion;

    document.getElementById('panel-formulario').hidden = false;
}

//Llena el select de regiones usando la lista que ya existe en el apps.js

function cargarRegionesUsuario() {
    const select = document.getElementById('usuario-region');
    select.innerHTML = '<option value="">Selecciona una región</option>' +
        Object.keys(regionesComunas).map(r => `<option value="${r}">${r}</option>`)
        .join('');
        
}

// Llena el select de comunas según la región elegida

function cargarComunasUsuario(){
    const region = document.getElementById('usuario-region').value;
    const select = document.getElementById('usuario-comuna');
    const lista = regionesComunas[region] || [];
    select.innerHTML = '<option value="">Seleciona una comuna</option>' +
        lista.map(c => `<option value="${c}">${c}</option>`).join('');
}
cargarRegionesUsuario();
document.getElementById('usuario-region').addEventListener('change', cargarComunasUsuario);

// Revisa un campo y devuelve el mensaje de error, o '' si está bien
function errorDe(campo, valor) {
    switch (campo) {
        case 'run':
            if (!valor) return 'El RUN es obligatorio.';
            if (!validarRun(valor)) return 'RUN inválido: 7 u 8 dígitos y el verificador (0-9 o K).';
            return '';
        case 'nombre':
            if (!valor) return 'El nombre es obligatorio.';
            if (valor.length > 50) return 'Máximo 50 caracteres.';
            return '';
        case 'apellidos':
            if (!valor) return 'Los apellidos son obligatorios.';
            if (valor.length > 100) return 'Máximo 100 caracteres.';
            return '';
        case 'correo':
            if (!valor) return 'El correo es obligatorio.';
            if (!validarCorreo(valor)) return 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            return '';
        case 'clave':
            if (!valor) return 'La contraseña es obligatoria.';
            if (valor.length < 4 || valor.length > 10) return 'Debe tener entre 4 y 10 caracteres.';
            return '';
        case 'rol':
            return valor ? '' : 'Selecciona un rol.';
        case 'region':
            return valor ? '' : 'Selecciona una región.';
        case 'comuna':
            return valor ? '' : 'Selecciona una comuna.';
        case 'direccion':
            if (!valor) return 'La dirección es obligatoria.';
            if (valor.length > 300) return 'Máximo 300 caracteres.';
            return '';
    }
    return '';
}

// Se ejecuta al presionar "Guardar" en el formulario
function guardarUsuario(event) {
    event.preventDefault(); // evita que la página se recargue sola

    // 1) Leer lo que la persona escribió en cada campo
    const datos = {
        run: document.getElementById('usuario-run').value.trim().toUpperCase(),
        nombre: document.getElementById('usuario-nombre').value.trim(),
        apellidos: document.getElementById('usuario-apellidos').value.trim(),
        correo: document.getElementById('usuario-correo').value.trim(),
        clave: document.getElementById('usuario-clave').value,
        rol: document.getElementById('usuario-rol').value,
        region: document.getElementById('usuario-region').value,
        comuna: document.getElementById('usuario-comuna').value,
        direccion: document.getElementById('usuario-direccion').value.trim()
    };

    // 2) Validar cada campo con la función que ya escribimos
    let hayError = false;
    for (const campo in datos) {
        const mensaje = errorDe(campo, datos[campo]);
        hayError = mostrarMensaje('error-usuario-' + campo, mensaje, 'error') || hayError;
    }

    if (hayError) return; // si algo está mal, no seguimos

    // 3) Revisar que el RUN y el correo no estén repetidos
    const usuarios = leerUsuarios();

    if (!runEditando) {
        const runRepetido = usuarios.some(u => u.run === datos.run);
        if (runRepetido) {
            mostrarMensaje('error-usuario-run', 'Ese RUN ya está registrado.', 'error');
            return;
        }
    }

    const correoRepetido = usuarios.some(u => u.correo.toLowerCase() === datos.correo.toLowerCase() && u.run !== datos.run);
    if (correoRepetido) {
        mostrarMensaje('error-usuario-correo', 'Ese correo ya está registrado.', 'error');
        return;
    }

    // 4) Guardar en el "cuaderno" del navegador: reemplazar si estamos editando, o agregar si es nuevo
    if (runEditando) {
        const indice = usuarios.findIndex(u => u.run === runEditando);
        usuarios[indice] = datos;
    } else {
        usuarios.push(datos);
    }
    localStorage.setItem('patitasUsuarios', JSON.stringify(usuarios));

    // 5) Avisar, cerrar el formulario y actualizar la tabla
    mostrarMensaje('usuario-resultado', runEditando ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.', 'ok');
    runEditando = null;
    document.getElementById('usuario-run').disabled = false;
    document.getElementById('form-gestion-usuario').reset();
    cerrarFormulario();
    listarUsarios();
}

// Muestra el detalle completo de un usuario
function verUsuario(run) {
    const usuario = leerUsuarios().find(u => u.run === run);
    if (!usuario) return;

    document.getElementById('detalle-usuario').innerHTML = `
        <dt>RUN</dt><dd>${usuario.run}</dd>
        <dt>Nombre</dt><dd>${usuario.nombre}</dd>
        <dt>Apellidos</dt><dd>${usuario.apellidos}</dd>
        <dt>Correo</dt><dd>${usuario.correo}</dd>
        <dt>Rol</dt><dd>${usuario.rol}</dd>
        <dt>Región</dt><dd>${usuario.region}</dd>
        <dt>Comuna</dt><dd>${usuario.comuna}</dd>
        <dt>Dirección</dt><dd>${usuario.direccion}</dd>`;

    document.getElementById('panel-detalle').hidden = false;
}

// Esconde el detalle
function cerrarDetalle() {
    document.getElementById('panel-detalle').hidden = true;
}