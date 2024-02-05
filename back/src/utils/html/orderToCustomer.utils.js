async function orderToCustomerHTML(orderDetails) {
    // Aquí puedes incluir lógica para obtener los detalles del pedido, por ejemplo, desde una base de datos o un servicio
    const { cart, customer, date } = orderDetails;

    // Generar los elementos del carrito en HTML
    const cartItemsHTML = cart.map(item => `
        <li>Producto: ${item.name}</li>
        <li>Cantidad: ${item.quantity}</li>
        <li>Precio: $${item.price}</li>
        <hr/>
    `).join('');

    // Generar los elementos del cliente en HTML
    const customerInfoHTML = `
        <ul>
            <li>Nombre: ${customer.name}</li>
            <li>Dirección: ${customer.address}</li>
            <li>Teléfono: ${customer.phone}</li>
        </ul>
    `;

    // Generar el HTML completo con los datos dinámicos
    const orderToCustomer = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Pedido</title>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f2f2f2;
                }
        
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                .title {
                    font-size: 24px;
                    text-align: center;
                    margin-bottom: 20px;
                }
        
                .content {
                    ul {
                        list-style: none;
                        padding-left: 0;
                    }
        
                    li {
                        margin-bottom: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="title">Confirmación de Pedido</h1>
                <div class="content">
                    <p>Su pedido ha sido creado correctamente:</p>
                    <ul>
                        ${cartItemsHTML}
                    </ul>
                    <p>Datos del Cliente:</p>
                    ${customerInfoHTML}
                    <p>Fecha del Pedido: ${date}</p>
                </div>
            </div>
        </body>
        </html>    
    `;

    return orderToCustomer;
}

export { orderToCustomerHTML };
