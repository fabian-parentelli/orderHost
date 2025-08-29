import env from '../../config/dotEnv.config.js';

async function postUserHtml(user) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Perfil Creado | La Tienda</title>
      <style>
          body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              background-color: #EAEBEF;
              color: #333;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .header {
              background-color: #bcd6e1;
              text-align: center;
              padding: 30px;
              border-bottom: 4px solid #336e99;
          }
          .header img {
              width: 60px;
              display: block;
              margin: 0 auto 10px auto;
          }
          .header h1 {
              margin: 0;
              font-size: 28px;
              color: #336e99;
          }
          .header p {
              font-weight: 600;
              color: #336e99;
              margin-top: 10px;
          }
          .content {
              padding: 30px;
              background-color: #f8f8f8;
          }
          .content p {
              margin: 15px 0;
              font-size: 16px;
              line-height: 1.6;
          }
          .content strong {
              color: #336e99;
          }
          .buttons {
              text-align: center;
              margin-top: 30px;
          }
          .buttons a {
              display: inline-block;
              margin: 0 10px;
              padding: 12px 20px;
              background-color: #bcd6e1;
              color: #336e99;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              box-shadow: 0 0 2px gray;
          }
          .footer {
              padding: 30px 20px;
              background-color: #bcd6e1;
              text-align: center;
              border-top: 1px solid #ccc;
          }
          .footer .footerTitle {
              text-align: center;
              margin-bottom: 10px;
          }
          .footer .footerTitle img {
              width: 30px;
              vertical-align: middle;
          }
          .footer .footerTitle h2 {
              display: inline-block;
              margin: 0 0 0 10px;
              color: #336e99;
              font-size: 20px;
              vertical-align: middle;
          }
          .footer p {
              font-size: 12px;
              color: #336e99;
              margin: 10px 0;
          }
          .footer a img {
              width: 100px;
              margin-top: 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://res.cloudinary.com/ddjldilsm/image/upload/v1753912653/logo_wv2w5g.png" alt="La Tienda" />
              <h1>La Tienda</h1>
              <p>Se ha generado un perfil a su nombre en nuestra plataforma</p>
          </div>
          <div class="content">
              <p>Hola <strong>${user.name}</strong>,</p>
              <p>Te informamos que se ha creado un perfil a tu nombre en <strong>La Tienda</strong>.</p>
              <p>Puedes acceder a la plataforma con los siguientes datos:</p>
              <p>Correo electrónico: <strong>${user.email}</strong></p>
              <p>Contraseña temporal: <strong>${user.password}</strong></p>
              <p>Te recomendamos cambiar esta contraseña una vez que inicies sesión desde tu perfil.</p>
              <p>Tu información personal está encriptada, garantizando la máxima seguridad y confidencialidad.</p>
              <p>Estamos a tu disposición para cualquier consulta.</p>
              <div class="buttons">
                  <a href="${env.frontUrl}">La Tienda</a>
                  <a href="${env.frontUrl}/contact">Contactar</a>
              </div>
          </div>
          <div class="footer">
              <div class="footerTitle">
                  <img src="https://res.cloudinary.com/ddjldilsm/image/upload/v1753912653/logo_wv2w5g.png" alt="La Tienda" />
                  <h2>La Tienda</h2>
              </div>
              <p>Este es un mensaje automático. Por favor, no responder a este correo.</p>
              <a href="${env.cataWeb}">
                  <img src="https://res.cloudinary.com/ddjldilsm/image/upload/v1749381347/cataweb_on2jbr.png" alt="Cataweb" />
              </a>
          </div>
      </div>
  </body>
  </html>
  `;
}

export { postUserHtml };