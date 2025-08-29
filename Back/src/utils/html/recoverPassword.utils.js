async function recoverPassword_HTML(link) {
    const emailRecoverPassword = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperar Contraseña</title>
            <style>
                :root {
                    --colorA: #005F73;
                    --colorB: #FF6F59;
                    --colorC: #D9D9D9;
                    --colorD: #FFFFFF;
                    --colorE: #ce7f36;
                    --colorF: #44787C;
                    --colorAA: #006073ec;
                }

                body {
                    font-family: Arial, sans-serif;
                    background-color: var(--colorC);
                    margin: 0;
                    padding: 0;
                }

                .wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }

                .container {
                    max-width: 500px;
                    background-color: var(--colorD);
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    text-align: center;
                    color: var(--colorA);
                }

                .logo-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .logo-title img {
                    height: 40px;
                    margin-right: 10px;
                }

                h1 {
                    font-size: 22px;
                    margin-bottom: 10px;
                    color: var(--colorA);
                }

                p {
                    font-size: 16px;
                    margin: 10px 0;
                    color: #333;
                }

                a.button {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 24px;
                    background-color: var(--colorF);
                    color: var(--colorD);
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }

                a.button:hover {
                    background-color: var(--colorA);
                }

                .footer {
                    margin-top: 30px;
                    font-size: 13px;
                    color: #777;
                }

                .footer a {
                    color: var(--colorB);
                    text-decoration: none;
                }

                .footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="logo-title">
                        <img src="https://res.cloudinary.com/dfhbkrtm8/image/upload/v1747866702/images/ydd0oa7xfo0qts0pxd4p.png" alt="CataWeb Logo" />
                    </div>
                    <h1>Recuperar Contraseña</h1>
                    <p>Haz clic en el siguiente botón para recuperar tu contraseña:</p>
                    <a href="${link}" class="button">Recuperar Contraseña</a>
                    <div class="footer">
                        <p>Este es un correo automático, por favor no respondas.</p>
                        <p>¿Necesitás ayuda? <a href="mailto:soporte@cataweb.com">Contactanos</a></p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    return emailRecoverPassword;
}

export { recoverPassword_HTML };