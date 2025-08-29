import env from "../../config/dotEnv.config.js";

export async function newOrderHtml(user, order) {
    return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Orden Creada</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #EAEBEF;
        margin: 0;
        padding: 0;
      }

      .container {
        width: 90%;
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 6px;
        overflow: hidden;
      }

      .header {
        background-color: #2C5469;
        padding: 20px;
        text-align: center;
      }

      .header img {
        width: 60px;
        display: block;
        margin: auto;
      }

      .header h1 {
        color: #EAEBEF;
        font-size: 28px;
        margin: 10px 0 0;
      }

      .subtitle {
        text-align: center;
        font-size: 16px;
        color: #EAEBEF;
        margin: 8px 0 0;
      }

      .body {
        padding: 20px;
        color: #333;
      }

      .body h3 {
        margin-top: 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 14px;
      }

      table th {
        background-color: #f4f4f4;
        padding: 8px;
        border: 1px solid #ddd;
        text-transform: uppercase;
      }

      table td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
      }

      .total {
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0;
      }

      .btn {
        display: inline-block;
        background-color: #2C5469;
        color: #fff !important;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 600;
      }

      .footer {
        background-color: #2C5469;
        color: #EAEBEF;
        text-align: center;
        padding: 15px;
        font-size: 14px;
      }

      .footer img {
        width: 40px;
        display: block;
        margin: auto;
      }

      .footer h2 {
        margin: 8px 0 0;
        font-size: 18px;
        color: #EAEBEF;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <img src="https://res.cloudinary.com/ddjldilsm/image/upload/v1756162793/logo_becjtt.png" alt="Logo" />
        <h1>La Colonial</h1>
        <p class="subtitle">Orden creada con éxito</p>
      </div>

      <!-- Body -->
      <div class="body">
        <h3>Hola ${user.name},</h3>
        <p>Recibimos con éxito tu pedido.</p>
        <p>El estado de la orden es <b>pendiente</b>.</p>

        <!-- Tabla de productos -->
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.cart
            .map(
                (prod) => `
              <tr>
                <td><img src="${prod.img}" alt="${prod.name}" width="50" /></td>
                <td>${prod.name}</td>
                <td>${prod.quantity}</td>
                <td>$${prod.price}</td>
                <td>$${prod.price * prod.quantity}</td>
              </tr>
            `
            )
            .join("")}
          </tbody>
        </table>

        <p class="total">Total: $${order.cart.reduce(
                (acc, pri) => acc + pri.quantity * pri.price,
                0
            )}</p>

        <p style="text-align:center;">
          <a href="${env.APP_URL}" class="btn">Ir a la plataforma</a>
        </p>

        <p>Puedes seguir el estado de la orden en nuestra plataforma.</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <img src="https://res.cloudinary.com/ddjldilsm/image/upload/v1756162793/logo_becjtt.png" alt="Logo" />
        <h2>La Colonial</h2>
        <p>Gracias por utilizar nuestra web</p>
      </div>
    </div>
  </body>
  </html>
  `;
};