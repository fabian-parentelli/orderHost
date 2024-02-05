async function registerSuccess(email) {

    let rolUser
    if (email.type == 'small') {
        rolUser = 'Minorista'
    } else {
        rolUser = 'Mayorista'
    };

    const emailRegister = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registro Exitoso</title>
            <style>
                /* Estilos aquí */
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Registro Exitoso</h1>
                </div>
                <div class="content">
                    <p>¡Hola <strong>${email.name}</strong>!</p>
                    <p>Tu registro en nuestro sitio ha sido exitoso. Aquí están los detalles de tu cuenta:</p>
                    <ul>
                        <li><strong>Nombre:</strong> ${email.name}</li>
                        <li><strong>Dirección:</strong> ${email.address}</li>
                        <li><strong>Teléfono:</strong> ${email.phone}</li>
                        <li><strong>Correo Electrónico:</strong> ${email.email}</li>
                        <li><strong>Rol:</strong> ${email.role}</li>
                        <li><strong>ID:</strong> ${email._id}</li>
                    </ul>
                    <p>¡Gracias por unirte a nosotros!</p>
                </div>
                <div class="footer">
                    <p>No responda a este correo electrónico. Este es un mensaje automático.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    return emailRegister;
};

export { registerSuccess };