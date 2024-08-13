let inventario = [];

function agregarProducto() {
    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let precio = parseFloat(document.getElementById('precio').value);

    // Validación
    if (!codigo || !nombre || isNaN(precio)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].codigo === codigo) {
            alert('El código de producto ya existe en el inventario.');
            return;
        }
    }

    let producto = {
        codigo: codigo,
        nombre: nombre,
        precio: precio
    };

    inventario.push(producto);
    document.getElementById('result').innerHTML = "Producto agregado al inventario.";
    
    // Limpiar campos
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';

    mostrarInventario(); // Opcional, muestra el inventario actualizado
}

function buscarProducto() {
    let codigo = document.getElementById('buscarCodigo').value;

    let productoEncontrado = buscarProductoPorCodigo(codigo);

    if (productoEncontrado) {
        document.getElementById('result').innerHTML =
            `<p>Producto encontrado:</p>
            <p>Código: ${productoEncontrado.codigo}</p>
            <p>Nombre: ${productoEncontrado.nombre}</p>
            <p>Precio: ${productoEncontrado.precio}</p>`;
    } else {
        document.getElementById('result').innerHTML = 'Producto no encontrado en el inventario.';
    }
    
    // Limpiar campo
    document.getElementById('buscarCodigo').value = '';
}

function mostrarInventario() {
    let resultado = "<h3>Inventario:</h3>";

    if (inventario.length === 0) {
        resultado += "<p>El inventario está vacío.</p>";
    } else {
        for (let i = 0; i < inventario.length; i++) {
            resultado +=    `<p>Producto ${i + 1}:<br>
                            Código: ${inventario[i].codigo}<br>
                            Nombre: ${inventario[i].nombre}<br>
                            Precio: ${inventario[i].precio}</p>`;
        }
    }

    document.getElementById('result').innerHTML = resultado;
}

function buscarProductoPorCodigo(codigo) {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].codigo === codigo) {
            return inventario[i];
        }
    }
    return null;
}