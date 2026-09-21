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
        </tr>`).join('');
}

listarUsarios();

// Mostrar formulario

function nuevoUsuario(){
    document.getElementById('panel-formulario').hidden = false;

}

//Esconde el forulario

function cerrarFormulario(){
    document.getElementById('panel-formulario').hidden = true;
}