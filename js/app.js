let inventario = [];

function agregarProducto(codigo, nombre, precio){

    for (let i = 0; i < inventario.length; i++){
        if (inventario[i].codigo === codigo){
            alert("El codigo de producto ya existe en el inventario."); 
            return;
        }
    }

    let producto = {
        codigo: codigo,
        nombre: nombre,
        precio: precio
    };

    inventario.push(producto);
    alert("Producto agregado al inventario.");

    console.log("Inventario actualizado:");
    mostrarInventario();
}


function buscarProductoPorCodigo(codigo){
    
    for(let i = 0; i < inventario.length; i++){
        if (inventario[i].codigo === codigo){
            return inventario[i];
        }
    }

    return null;
}

function mostrarInventario(){
    console.log("Inventario:");
    for (let i = 0; i < inventario.length; i++){
        console.log("Producto:" + (i + 1) + ":");
        console.log("Codigo:" + inventario[i].codigo);
        console.log("Nombre:" + inventario[i].nombre);
        console.log("Precio:" + inventario[i].precio);
    }
}

let operacion = prompt("¿Que desea hacer?\n1)Agregar un producto al inventario \n2)Buscar un producto por codigo \n3)Mostrar todo el inventario \n Ingrese 1, 2 o 3 para avanzar.");

if(operacion === "1"){
    let codigo = prompt("Ingrese el codigo del producto:");
    let nombre = prompt("Ingrese el nombre del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto:"));

    agregarProducto(codigo, nombre, precio);
} else if (operacion === "2"){
    let codigoBuscar = prompt("Ingrese el codigo del producto a buscar:");

    let productoEncontrado = buscarProductoPorCodigo(codigoBuscar);

    if (productoEncontrado){
        console.log("Producto encontrado:");
        console.log("Codigo: " + productoEncontrado.codigo);
        console.log("Nombre: " + productoEncontrado.nombre);
        console.log("Precio: " + productoEncontrado.precio);
    } else {
        alert("Producto no encontrado en el inventario.");
    }
} else if (operacion === "3"){
    mostrarInventario();
} else {
    alert("Opcion no valida. Por favor ingrese 1 o 2.")
}

console.log("Inventario completo:");
mostrarInventario();