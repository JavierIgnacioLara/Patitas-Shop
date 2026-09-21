const productosBase = [
    { id: 1, codigo: 'P001', nombre: 'Alimento Premium Perro', precio: 15990, categoria: 'Perros', stock: 15, stockCritico: 5, imagen: 'img/producto-perro.jpg', descripcion: 'Alimento balanceado para perros adultos.' },
    { id: 2, codigo: 'P002', nombre: 'Alimento Premium Gato', precio: 12990, categoria: 'Gatos', stock: 12, stockCritico: 4, imagen: 'img/producto-gato.jpg', descripcion: 'Alimento completo para gatos adultos.' },
    { id: 3, codigo: 'P003', nombre: 'Correa para Paseo', precio: 10990, categoria: 'Accesorios', stock: 8, stockCritico: 2, imagen: 'img/producto-correa.jpg', descripcion: 'Correa resistente para paseos diarios.' },
    { id: 4, codigo: 'P004', nombre: 'Comedero para Mascotas', precio: 16990, categoria: 'Accesorios', stock: 10, stockCritico: 3, imagen: 'img/producto-comedero.jpg', descripcion: 'Comedero práctico para perros y gatos.' },
    { id: 5, codigo: 'P005', nombre: 'Arena Sanitaria para Gatos', precio: 4990, categoria: 'Gatos', stock: 20, stockCritico: 5, imagen: 'img/producto-arena.jpg', descripcion: 'Arena absorbente y sin olor para gatos.' },
    { id: 6, codigo: 'P006', nombre: 'Simparica antiparasitaria', precio: 7990, categoria: 'Perros', stock: 18, stockCritico: 2, imagen: 'img/producto-simparica.webp', descripcion: 'Medicamento antiparasitario para perros.' },
    { id: 7, codigo: 'P007', nombre: 'Advantage antiparasitaria', precio: 12990, categoria: 'Gatos', stock: 14, stockCritico: 3, imagen: 'img/producto-advantage.jpg', descripcion: 'Medicamento antiparasitario para gatos.' },
    { id: 8, codigo: 'P008', nombre: 'Caja de transporte para gatos', precio: 23990, categoria: 'Accesorios', stock: 8, stockCritico: 3, imagen: 'img/producto-caja-transporte.jpg', descripcion: 'Caja de transporte segura para gatos.' },
    { id: 9, codigo: 'P009', nombre: 'Juguete interactivo para gatos', precio: 19990, categoria: 'Gatos', stock: 6, stockCritico: 2, imagen: 'img/producto-centro-juego.jpg', descripcion: 'Juguete que estimula la mente de los gatos.' },
    { id: 10, codigo: 'P010', nombre: 'Juguete interactivo para perros', precio: 8990, categoria: 'Perros', stock: 16, stockCritico: 4, imagen: 'img/producto-juguete-perro.webp', descripcion: 'Juguete Para Perro Diseño Kamu Hueso Strong.' }

];

const banner = document.getElementById("imagen-central");

if (banner) {

    const imagenes = [
        "img/banner-perritos.jpg",
        "img/banner-producto.jpg",
        "img/banner-gato.jpg",
        "img/banner-productos.jpg"

    ];

    let i = 0;

    setInterval(function () {
        i = (i + 1) % imagenes.length;
        banner.src = imagenes[i];
    }, 4000);
};

const regionesComunas = {
    'Arica y Parinacota': ['Arica', 'Camarones', 'Putre'],
    'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte'],
    'Antofagasta': ['Antofagasta', 'Calama', 'Tocopilla'],
    'Atacama': ['Copiapó', 'Caldera', 'Vallenar'],
    'Coquimbo': ['La Serena', 'Coquimbo', 'Ovalle'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    'Metropolitana': ['Santiago','Quilicura','Maipú', 'Puente Alto','Lampa','San Bernardo','Colina','La Florida','La Pintana','La Granja','Lo Barnechea','Lo Prado','Macul','Ñuñoa','Peñalolén','Providencia','Pudahuel','Recoleta','Renca','San Joaquín','San Miguel','Santiago Centro'],
    'O’Higgins': ['Rancagua', 'San Fernando', 'Rengo'],
    'Maule': ['Talca', 'Curicó', 'Linares'],
    'Ñuble': ['Chillán', 'San Carlos', 'Bulnes'],
    'Biobío': ['Concepción', 'Los Ángeles', 'Talcahuano'],
    'La Araucanía': ['Temuco', 'Villarrica', 'Angol'],
    'Los Ríos': ['Valdivia', 'La Unión', 'Panguipulli'],
    'Los Lagos': ['Puerto Montt', 'Osorno', 'Castro'],
    'Aysén': ['Coyhaique', 'Aysén', 'Chile Chico'],
    'Magallanes': ['Punta Arenas', 'Puerto Natales', 'Porvenir']
};

function formatoPrecio(valor) {
    return '$' + Number(valor).toLocaleString('es-CL');
}

function obtenerProductosEliminados() {
    return JSON.parse(localStorage.getItem('patitasProductosEliminados')) || [];
}

function guardarProductosEliminados(ids) {
    localStorage.setItem('patitasProductosEliminados', JSON.stringify(ids));
}

function obtenerProductos() {

    const adicionales =
        JSON.parse(localStorage.getItem('patitasProductos')) || [];
    const eliminados = new Set(obtenerProductosEliminados());

    // Crear una copia de los productos base, excluyendo los eliminados
    const productos = productosBase.filter(
        producto => !eliminados.has(producto.id)
    );

    // Reemplazar los productos base que hayan sido modificados
    adicionales.forEach(productoActualizado => {

        if (eliminados.has(productoActualizado.id)) {
            return;
        }

        const indice = productos.findIndex(
            p => p.id === productoActualizado.id
        );

        if (indice !== -1) {
            productos[indice] = productoActualizado;
        } else {
            // Si es un producto nuevo, agregarlo
            productos.push(productoActualizado);
        }
    });

    return productos;
}

function agregarAlCarrito(id) {

    const productos = obtenerProductos();

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert('Producto no encontrado.');
        return;
    }

    let carrito = JSON.parse(
        localStorage.getItem('patitasCarrito')
    ) || [];

    const productoCarrito = carrito.find(
        p => p.id === id
    );

    const cantidadActual = productoCarrito
        ? productoCarrito.cantidad
        : 0;

    // Verificar stock disponible
    if (cantidadActual >= producto.stock) {
        alert('No hay más stock disponible de este producto.');
        return;
    }

    if (productoCarrito) {

        productoCarrito.cantidad += 1;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    localStorage.setItem(
        'patitasCarrito',
        JSON.stringify(carrito)
    );

    actualizarContadorCarrito();

    alert(`${producto.nombre} agregado al carrito.`);
}

// función para mostrar la tabla de productos en el panel de administración
function mostrarTablaAdminProductos() {
    const tabla = document.getElementById('tabla-productos-admin');
    if (!tabla) return;
    const productos = obtenerProductos();
    tabla.innerHTML = productos.map(producto => `
        <tr>
            <td>${producto.codigo}</td>

            <td>${producto.nombre}</td>

            <td>${producto.categoria}</td>

            <td>${formatoPrecio(producto.precio)}</td>

            <td>
                <input
                    type="number"
                    min="0"
                    step="1"
                    value="${producto.stock}"
                    id="stock-${producto.id}"
                    style="width:80px;"
                >
            </td>

            <td>
                <input
                    type="number"
                    min="0"
                    step="1"
                    value="${producto.stockCritico}"
                    id="critico-${producto.id}"
                    style="width:80px;"
                >
            </td>

            <td>
                <button
                    type="button"
                    class="btn btn-orange"
                    onclick="actualizarStockProducto(${producto.id})"
                >
                    Guardar
                </button>
                <button
                    type="button"
                    class="btn btn-orange"
                    onclick="eliminarProductoAdmin(${producto.id})"
                >
                    Eliminar
                </button>
            </td>

        </tr>
    `).join('');
}

function actualizarStockProducto(id) {

    const productos = obtenerProductos();

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert('Producto no encontrado.');
        return;
    }

    const stockInput = document.getElementById(`stock-${id}`);
    const criticoInput = document.getElementById(`critico-${id}`);

    const nuevoStock = Number(stockInput.value);
    const nuevoStockCritico = Number(criticoInput.value);

    // Validar stock
    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
        alert('El stock debe ser un número entero mayor o igual a 0.');
        return;
    }

    // Validar stock crítico
    if (!Number.isInteger(nuevoStockCritico) || nuevoStockCritico < 0) {
        alert('El stock crítico debe ser un número entero mayor o igual a 0.');
        return;
    }

    // Actualizar los datos del producto
    producto.stock = nuevoStock;
    producto.stockCritico = nuevoStockCritico;

    // Obtener productos modificados anteriormente
    const productosGuardados =
        JSON.parse(localStorage.getItem('patitasProductos')) || [];

    // Buscar si este producto ya había sido modificado
    const indice = productosGuardados.findIndex(
        p => p.id === id
    );

    if (indice !== -1) {

        // Actualizar producto existente
        productosGuardados[indice] = producto;

    } else {

        // Guardar producto modificado por primera vez
        productosGuardados.push(producto);
    }

    // Guardar en LocalStorage
    localStorage.setItem(
        'patitasProductos',
        JSON.stringify(productosGuardados)
    );

    // Actualizar tabla
    mostrarTablaAdminProductos();

    alert('Stock actualizado correctamente.');
}

function guardarProductosAdicionales(productos) {
    localStorage.setItem('patitasProductos', JSON.stringify(productos));
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('patitasCarrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('patitasCarrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const total = obtenerCarrito().reduce((suma, item) => suma + Number(item.cantidad), 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}

function agregarAlCarrito(id, cantidad = 1) {
    const producto = obtenerProductos().find(p => p.id === id);
    if (!producto) return;
    const cantidadSolicitada = Math.max(1, Number(cantidad) || 1);
    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.id === id);
    const nuevaCantidad = existente ? existente.cantidad + cantidadSolicitada : cantidadSolicitada;
    if (nuevaCantidad > producto.stock) {
        alert('No hay stock suficiente para esa cantidad.');
        return;
    }
    if (existente) existente.cantidad = nuevaCantidad;
    else carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidadSolicitada, imagen: producto.imagen });
    guardarCarrito(carrito);
    alert('Producto agregado al carrito.');
}

function tarjetaProducto(producto) {
    const alertaStock = producto.stock <= producto.stockCritico ? '<span class="stock-alert">Stock crítico</span>' : '';
    return `
        <article class="product-card">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="product-info">
                <span class="category-tag">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                ${alertaStock}
                <span class="price">${formatoPrecio(producto.precio)}</span>
                <small>Stock: ${producto.stock}</small>
                <div class="product-actions">
                    <a class="btn btn-light" href="detalle-producto.html?id=${producto.id}">Ver detalle</a>
                    <button class="btn btn-orange" type="button" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
                </div>
            </div>
        </article>`;
}

function mostrarProductos(contenedorId = 'productos-container', filtros = {}) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let lista = obtenerProductos();

    const texto = (filtros.texto || '').toLowerCase();
    const categoria = filtros.categoria || 'Todas';

    if (texto) {
        lista = lista.filter(p =>
            `${p.nombre} ${p.descripcion} ${p.categoria}`
                .toLowerCase()
                .includes(texto)
        );
    }

    if (categoria !== 'Todas') {
        lista = lista.filter(p => p.categoria === categoria);
    }

    // En el inicio mostramos solamente 4 productos
    if (contenedorId === 'productos-container' && location.pathname.includes('index.html')) {
        lista = lista.slice(0, 4);
    }

    contenedor.innerHTML = lista.length
        ? lista.map(tarjetaProducto).join('')
        : '<div class="empty full-width">No encontramos productos con esos criterios.</div>';
}

function prepararBusqueda() {
    const input = document.getElementById('busqueda-productos');
    const categoria = document.getElementById('filtro-categoria');
    const contenedor = document.getElementById('productos-container');
    if (!input || !contenedor) return;
    const aplicar = () => mostrarProductos('productos-container', { texto: input.value, categoria: categoria ? categoria.value : 'Todas' });
    input.addEventListener('input', aplicar);
    if (categoria) categoria.addEventListener('change', aplicar);
}

function limpiarBusqueda() {
    const input = document.getElementById('busqueda-productos');
    if (input) input.value = '';
    const categoria = document.getElementById('filtro-categoria');
    if (categoria) categoria.value = 'Todas';
    mostrarProductos('productos-container');
}

function mostrarDetalleProducto() {
    const contenedor = document.getElementById('detalle-producto');
    if (!contenedor) return;
    const id = Number(new URLSearchParams(location.search).get('id')) || 1;
    const producto = obtenerProductos().find(p => p.id === id) || obtenerProductos()[0];
    if (!producto) return;
    contenedor.innerHTML = `
        <div class="detail-image"><img src="${producto.imagen}" alt="${producto.nombre}"></div>
        <div class="detail-info">
            <span class="category-tag">${producto.categoria}</span>
            <h1>${producto.nombre}</h1>
            <span class="price">${formatoPrecio(producto.precio)}</span>
            <p>${producto.descripcion}</p>
            <p><strong>Stock disponible:</strong> ${producto.stock}</p>
            ${producto.stock <= producto.stockCritico ? '<p class="stock-alert">⚠ Producto con stock crítico.</p>' : ''}
            <label for="cantidad"><strong>Cantidad</strong></label>
            <input id="cantidad" class="quantity" type="number" min="1" max="${producto.stock}" value="1">
            <button class="btn btn-orange" type="button" onclick="agregarCantidad(${producto.id})">Agregar al carrito</button>
        </div>`;
}

function agregarCantidad(id) {
    const cantidad = Number(document.getElementById('cantidad')?.value) || 1;
    agregarAlCarrito(id, cantidad);
}

function mostrarCarrito() {
    const contenedor = document.getElementById('carrito-container');
    const totalEl = document.getElementById('carrito-total');
    if (!contenedor) return;
    const carrito = obtenerCarrito();
    if (!carrito.length) {
        contenedor.innerHTML = '<div class="empty">Tu carrito está vacío. <a href="productos.html">Ver productos</a></div>';
        if (totalEl) totalEl.textContent = formatoPrecio(0);
        return;
    }
    contenedor.innerHTML = `<div class="table-responsive"><table class="cart-table"><thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr></thead><tbody>
        ${carrito.map(item => `<tr><td><div class="cart-product"><img src="${item.imagen}" alt="${item.nombre}"><span>${item.nombre}</span></div></td><td>${formatoPrecio(item.precio)}</td><td><div class="qty-control"><button type="button" onclick="cambiarCantidad(${item.id}, -1)">−</button><span>${item.cantidad}</span><button type="button" onclick="cambiarCantidad(${item.id}, 1)">+</button></div></td><td>${formatoPrecio(item.precio * item.cantidad)}</td><td><button class="btn btn-light" type="button" onclick="eliminarDelCarrito(${item.id})">Eliminar</button></td></tr>`).join('')}
    </tbody></table></div>`;
    const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    if (totalEl) totalEl.textContent = formatoPrecio(total);
}

function cambiarCantidad(id, cambio) {

    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === id);
    const producto = obtenerProductos().find(
        p => p.id === id
    );

    if (!item || !producto) return;

    const nuevaCantidad = item.cantidad + cambio;

    // Si intenta superar el stock
    if (nuevaCantidad > producto.stock) {
        alert('Se alcanzó el stock disponible.');
        return;
    }

    // Si llega a 0, eliminar del carrito
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    item.cantidad = nuevaCantidad;

    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    guardarCarrito(obtenerCarrito().filter(item => item.id !== id));
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('patitasCarrito');
    mostrarCarrito();
    actualizarContadorCarrito();
}

function finalizarCompra() {

    const carrito = obtenerCarrito();

    if (!carrito.length) {
        alert('Agrega productos antes de finalizar la compra.');
        return;
    }

    const productos = obtenerProductos();

    // Descontar stock de cada producto comprado
    carrito.forEach(item => {

        const producto = productos.find(
            p => p.id === item.id
        );

        if (producto) {
            producto.stock -= item.cantidad;
        }

    });

    // Guardar los productos actualizados
    localStorage.setItem(
        'patitasProductos',
        JSON.stringify(productos)
    );

    alert(
        'Compra realizada correctamente. ¡Gracias por preferir Patitas Shop!'
    );

    // Vaciar carrito después de la compra
    vaciarCarrito();

    // Actualizar la tienda
    mostrarProductos();
}

function mostrarMensaje(id, texto, tipo = 'error') {
    const el = document.getElementById(id);
    if (!el) return Boolean(texto);
    el.textContent = texto;
    el.className = 'form-message ' + tipo;
    return tipo === 'error' && Boolean(texto);
}

function validarCorreo(correo) {
    return /^[A-Za-z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

function validarLogin(event) {
    event.preventDefault();

    const correo = document.getElementById('login-correo').value.trim();
    const clave = document.getElementById('login-clave').value;

    let error = false;

    error = mostrarMensaje(
        'error-login-correo',
        !correo
            ? 'El correo es obligatorio.'
            : correo.length > 100
                ? 'Máximo 100 caracteres.'
                : !validarCorreo(correo)
                    ? 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.'
                    : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-login-clave',
        !clave
            ? 'La contraseña es obligatoria.'
            : clave.length < 4 || clave.length > 10
                ? 'Debe tener entre 4 y 10 caracteres.'
                : '',
        'error'
    ) || error;

    if (error) return;

    // Obtener usuarios registrados
    const usuarios = JSON.parse(
        localStorage.getItem('patitasUsuarios')
    ) || [];

    // Buscar usuario por correo y contraseña
    const usuario = usuarios.find(
        u => u.correo === correo && u.clave === clave
    );

    // Si no existe
    if (!usuario) {
        mostrarMensaje(
            'resultado-login',
            'Correo o contraseña incorrectos.',
            'error'
        );
        return;
    }

    // Guardar usuario que inició sesión
    localStorage.setItem(
        'patitasUsuarioActual',
        JSON.stringify(usuario)
    );

    // Mensaje según el rol
    mostrarMensaje(
        'resultado-login',
        `Inicio de sesión correcto. Bienvenido ${usuario.nombre}.`,
        'ok'
    );

    actualizarSesionNavbar();
}

function validarContacto(event) {
    event.preventDefault();
    const nombre = document.getElementById('contacto-nombre').value.trim();
    const correo = document.getElementById('contacto-correo').value.trim();
    const comentario = document.getElementById('contacto-comentario').value.trim();
    let error = false;
    error = mostrarMensaje('error-contacto-nombre', !nombre ? 'El nombre es obligatorio.' : nombre.length > 100 ? 'Máximo 100 caracteres.' : '', 'error') || error;
    error = mostrarMensaje('error-contacto-correo', correo.length > 100 ? 'Máximo 100 caracteres.' : correo && !validarCorreo(correo) ? 'Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com.' : '', 'error') || error;
    error = mostrarMensaje('error-contacto-comentario', !comentario ? 'El comentario es obligatorio.' : comentario.length > 500 ? 'Máximo 500 caracteres.' : '', 'error') || error;
    if (!error) {
        mostrarMensaje('resultado-contacto', 'Mensaje enviado correctamente.', 'ok');
        event.target.reset();
    }
}

function validarRun(run) {
    return /^\d{7,8}[0-9Kk]$/.test(run);
}



function validarRegistro(event) {
    event.preventDefault();

    const run = document.getElementById('registro-run').value.trim();
    const nombre = document.getElementById('registro-nombre').value.trim();
    const apellidos = document.getElementById('registro-apellidos').value.trim();
    const correo = document.getElementById('registro-correo').value.trim();
    const clave = document.getElementById('registro-clave').value;
    const direccion = document.getElementById('registro-direccion').value.trim();
    const region = document.getElementById('registro-region').value;
    const comuna = document.getElementById('registro-comuna').value;

    let error = false;

    error = mostrarMensaje(
        'error-registro-run',
        !run
            ? 'El RUN es obligatorio.'
            : !validarRun(run)
                ? 'RUN: 7 a 9 caracteres, sin puntos ni guion.'
                : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-nombre',
        !nombre
            ? 'El nombre es obligatorio.'
            : nombre.length > 50
                ? 'Máximo 50 caracteres.'
                : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-apellidos',
        !apellidos
            ? 'Los apellidos son obligatorios.'
            : apellidos.length > 100
                ? 'Máximo 100 caracteres.'
                : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-correo',
        !correo
            ? 'El correo es obligatorio.'
            : correo.length > 100
                ? 'Máximo 100 caracteres.'
                : !validarCorreo(correo)
                    ? 'Correo no permitido.'
                    : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-clave',
        !clave
            ? 'La contraseña es obligatoria.'
            : clave.length < 4 || clave.length > 10
                ? 'Debe tener entre 4 y 10 caracteres.'
                : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-region',
        !region ? 'Selecciona una región.' : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-comuna',
        !comuna ? 'Selecciona una comuna.' : '',
        'error'
    ) || error;

    error = mostrarMensaje(
        'error-registro-direccion',
        !direccion
            ? 'La dirección es obligatoria.'
            : direccion.length > 300
                ? 'Máximo 300 caracteres.'
                : '',
        'error'
    ) || error;

    if (error) return;

    // Obtener usuarios existentes
    const usuarios = JSON.parse(
        localStorage.getItem('patitasUsuarios')
    ) || [];

    // Verificar RUN duplicado
    const runExiste = usuarios.some(
        usuario => usuario.run === run
    );

    if (runExiste) {
        mostrarMensaje(
            'resultado-registro',
            'El RUN ya se encuentra registrado.',
            'error'
        );
        return;
    }

    // Verificar correo duplicado
    const correoExiste = usuarios.some(
        usuario => usuario.correo.toLowerCase() === correo.toLowerCase()
    );

    if (correoExiste) {
        mostrarMensaje(
            'resultado-registro',
            'El correo ya se encuentra registrado.',
            'error'
        );
        return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
        run,
        nombre,
        apellidos,
        correo,
        clave,
        fechaNacimiento: document.getElementById('registro-fecha').value,
        region,
        comuna,
        direccion,
        rol: 'Cliente'
    };

    // Guardar usuario
    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        'patitasUsuarios',
        JSON.stringify(usuarios)
    );

    mostrarMensaje(
        'resultado-registro',
        'Usuario registrado correctamente.',
        'ok'
    );

    event.target.reset();
    cargarComunas();
}

function crearAdministradorInicial() {

    const usuarios = JSON.parse(
        localStorage.getItem('patitasUsuarios')
    ) || [];

    // Verificar si el administrador ya existe
    const administradorExiste = usuarios.some(
        usuario => usuario.correo === 'admin@duoc.cl'
    );

    // Si ya existe, no hacer nada
    if (administradorExiste) {
        return;
    }

    // Crear administrador predeterminado
    const administrador = {
        run: '111111111',
        nombre: 'Administrador',
        apellidos: 'Patitas Shop',
        correo: 'admin@duoc.cl',
        clave: '123456',
        fechaNacimiento: '',
        region: 'Metropolitana',
        comuna: 'Santiago',
        direccion: 'Administración Patitas Shop',
        rol: 'Administrador'
    };

    // Agregar administrador a la lista
    usuarios.push(administrador);

    // Guardar usuarios
    localStorage.setItem(
        'patitasUsuarios',
        JSON.stringify(usuarios)
    );

    console.log('Administrador inicial creado correctamente.');
}

function obtenerUsuarioActual() {
    return JSON.parse(
        localStorage.getItem('patitasUsuarioActual')
    ) || null;
}


function actualizarSesionNavbar() {

    const usuario = obtenerUsuarioActual();

    // Buscar elementos del menú
    const navLinks = document.querySelector('.nav-links');

    if (!navLinks) return;

    // Eliminar elementos de sesión creados anteriormente
    const sesionAnterior = navLinks.querySelector('.sesion-usuario');
    
    if (sesionAnterior) {
        sesionAnterior.remove();
    }

    const adminAnterior = navLinks.querySelector('.admin-link');

    if (adminAnterior) {
        adminAnterior.remove();
    }

    // Si no hay usuario conectado
    if (!usuario) {
        return;
    }

    // Crear nombre del usuario
    const usuarioLink = document.createElement('span');

    usuarioLink.className = 'sesion-usuario';

    usuarioLink.innerHTML =
        `👤 ${usuario.nombre}`;

    navLinks.appendChild(usuarioLink);


    // Si es administrador mostrar Administración
    if (usuario.rol === 'Administrador') {

        const adminLink = document.createElement('a');

        adminLink.href = 'admin/index.html';
        adminLink.className = 'admin-link';
        adminLink.textContent = 'Administración';

        navLinks.appendChild(adminLink);
    }


    // Crear botón cerrar sesión
    const cerrarLink = document.createElement('a');

    cerrarLink.href = '#';
    cerrarLink.className = 'sesion-usuario';
    cerrarLink.textContent = 'Cerrar sesión';

    cerrarLink.addEventListener('click', function(event) {
        event.preventDefault();
        cerrarSesion();
    });

    navLinks.appendChild(cerrarLink);
}


function cerrarSesion() {

    localStorage.removeItem('patitasUsuarioActual');

    actualizarSesionNavbar();

    window.location.href = 'index.html';
}

function cargarRegiones() {
    const select = document.getElementById('registro-region');
    if (!select) return;
    select.innerHTML = '<option value="">Selecciona una región</option>' + Object.keys(regionesComunas).map(r => `<option value="${r}">${r}</option>`).join('');
    select.addEventListener('change', cargarComunas);
}

function cargarComunas() {
    const region = document.getElementById('registro-region');
    const comuna = document.getElementById('registro-comuna');
    if (!region || !comuna) return;
    const lista = regionesComunas[region.value] || [];
    comuna.innerHTML = '<option value="">Selecciona una comuna</option>' + lista.map(c => `<option value="${c}">${c}</option>`).join('');
}

function prepararFormularioAdmin() {
    const form = document.getElementById('form-producto-admin');
    if (!form) return;
    const params = new URLSearchParams(location.search);
    const editarId = Number(params.get('id'));
    const adicionales = JSON.parse(localStorage.getItem('patitasProductos')) || [];
    if (editarId) {
        const producto = adicionales.find(p => p.id === editarId);
        if (producto) {
            document.getElementById('admin-codigo').value = producto.codigo || '';
            document.getElementById('admin-nombre').value = producto.nombre;
            document.getElementById('admin-descripcion').value = producto.descripcion;
            document.getElementById('admin-precio').value = producto.precio;
            document.getElementById('admin-stock').value = producto.stock;
            document.getElementById('admin-stock-critico').value = producto.stockCritico;
            document.getElementById('admin-categoria').value = producto.categoria;
            document.getElementById('admin-titulo-form').textContent = 'Editar producto';
        }
    }
    form.addEventListener('submit', e => {
        e.preventDefault();
        const codigo = document.getElementById('admin-codigo').value.trim();
        const nombre = document.getElementById('admin-nombre').value.trim();
        const descripcion = document.getElementById('admin-descripcion').value.trim();
        const precio = Number(document.getElementById('admin-precio').value);
        const stock = Number(document.getElementById('admin-stock').value);
        const stockCritico = Number(document.getElementById('admin-stock-critico').value || 0);
        const categoria = document.getElementById('admin-categoria').value;
        const imagen = document.getElementById('admin-imagen').value.trim() || 'img/patitashop2.png';
        const resultado = document.getElementById('resultado-admin-producto') || document.getElementById('admin-resultado');
        if (!codigo || codigo.length < 3 || !nombre || nombre.length > 100 || descripcion.length > 500 || precio < 0 || stock < 0 || !Number.isInteger(stock) || stockCritico < 0 || !Number.isInteger(stockCritico) || !categoria) {
            if (resultado) {
                resultado.textContent = 'Revisa los campos según las reglas del proyecto.';
                resultado.className = 'form-message error';
            }
            return;
        }
        const lista = JSON.parse(localStorage.getItem('patitasProductos')) || [];
        const producto = { id: editarId || Date.now(), codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen };
        const indice = lista.findIndex(p => p.id === producto.id);
        if (indice >= 0) lista[indice] = producto; else lista.push(producto);
        guardarProductosAdicionales(lista);

        if (typeof mostrarTablaAdminProductos === 'function') {
            mostrarTablaAdminProductos();
        }

        if (resultado) {
            resultado.textContent = editarId ? 'Producto actualizado correctamente.' : 'Producto agregado correctamente.';
            resultado.className = 'form-message ok';
        }

        form.reset();
        document.getElementById('admin-titulo-form').textContent = 'Nuevo producto';
        document.getElementById('admin-codigo').focus();
    });
}

function eliminarProductoAdmin(id) {
    const lista = JSON.parse(localStorage.getItem('patitasProductos')) || [];
    const eliminados = new Set(obtenerProductosEliminados());
    eliminados.add(Number(id));

    localStorage.setItem('patitasProductos', JSON.stringify(lista.filter(p => p.id !== Number(id))));
    guardarProductosEliminados([...eliminados]);
    mostrarTablaAdminProductos();

    alert('Producto eliminado correctamente.');
}

function prepararFormularioUsuarioAdmin() {
    const form = document.getElementById('form-usuario-admin');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const run = document.getElementById('usuario-run').value.trim();
        const nombre = document.getElementById('usuario-nombre').value.trim();
        const apellidos = document.getElementById('usuario-apellidos').value.trim();
        const correo = document.getElementById('usuario-correo').value.trim();
        const rol = document.getElementById('usuario-rol').value;
        const resultado = document.getElementById('usuario-resultado');
        if (!validarRun(run) || !nombre || nombre.length > 50 || !apellidos || apellidos.length > 100 || !validarCorreo(correo) || !rol) {
            resultado.textContent = 'Revisa RUN, nombre, apellidos, correo y rol.';
            resultado.className = 'form-message error';
            return;
        }
        const usuarios = JSON.parse(localStorage.getItem('patitasUsuarios')) || [];
        usuarios.push({ run, nombre, apellidos, correo, rol });
        localStorage.setItem('patitasUsuarios', JSON.stringify(usuarios));
        resultado.textContent = 'Usuario creado correctamente.';
        resultado.className = 'form-message ok';
        form.reset();
        mostrarUsuariosAdmin();
    });
}

function mostrarUsuariosAdmin() {
    const tabla = document.getElementById('admin-usuarios-body');
    if (!tabla) return;
    const usuarios = JSON.parse(localStorage.getItem('patitasUsuarios')) || [];
    tabla.innerHTML = usuarios.length ? usuarios.map((u, i) => `<tr><td>${u.run}</td><td>${u.nombre} ${u.apellidos || ''}</td><td>${u.correo}</td><td>${u.rol}</td>
    <td>
        ${
            u.correo === 'admin@duoc.cl'
                ? '<span class="muted">🔒 Protegido</span>'
                : `<button class="btn btn-danger btn-small"
                    type="button"
                    onclick="eliminarUsuarioAdmin('${u.run}')">
                    Eliminar
                </button>`
        }
    </td>
    </tr>`).join('') : '<tr><td colspan="5">No hay usuarios registrados todavía.</td></tr>';
}

function eliminarUsuarioAdmin(indice) {
    const usuarios = JSON.parse(localStorage.getItem('patitasUsuarios')) || [];
    usuarios.splice(indice, 1);
    localStorage.setItem('patitasUsuarios', JSON.stringify(usuarios));
    mostrarUsuariosAdmin();
}

function inicializar() {
    actualizarContadorCarrito();
    mostrarProductos();
    mostrarDetalleProducto();
    mostrarCarrito();
    prepararBusqueda();
    cargarRegiones();
    prepararFormularioAdmin();
    mostrarTablaAdminProductos();
    prepararFormularioUsuarioAdmin();
    mostrarUsuariosAdmin();
}

crearAdministradorInicial();

document.addEventListener('DOMContentLoaded', function () {
    actualizarSesionNavbar();
});

document.addEventListener('DOMContentLoaded', inicializar);
