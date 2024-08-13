document.addEventListener('DOMContentLoaded', () => {
    let linkPagar = document.getElementById('linkPagar');
        console.log(linkPagar);
    linkPagar.addEventListener('click', (event) => {
        event.preventDefault();
        let confirmacion = confirm("¿Está seguro que desea realizar la compra?");
        if (confirmacion) {
            try {
                const productoId = '{{producto.id}}';  // Esto debería ser dinámico según el producto
                const productoNombre = '{{producto.nombre}}';
                const productoDescripcion = '{{producto.descripcion}}';
                const productoPrecio = '{{producto.precio}}';
                const productoFoto = '{{producto.foto}}';

                redirigirAPago(productoId, productoNombre, productoDescripcion, productoPrecio, productoFoto);
            } catch (error) {
                console.log(error);
                alert("No se pudo realizar la compra.");
            }
        }
    });
});

const redirigirAPago = (productoId, productoNombre, productoDescripcion, productoPrecio, productoFoto) => {
    const cantidad = document.getElementById('cantidad').value;

    // Guardar la información del producto en localStorage
    localStorage.setItem('producto', JSON.stringify({
        id: productoId,
        nombre: productoNombre,
        descripcion: productoDescripcion,
        precio: productoPrecio,
        foto: productoFoto,
        cantidad: cantidad
    }));

    // Redirigir a la vista de pago
    location.href = "/pago";
}