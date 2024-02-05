import { transporter } from '../utils/nodeMailer.utils.js';

export const sendEmail = async (email) => {
    
    await transporter.sendMail({
        from: 'Distribuidora La Colonial',
        to: email.to,
        subject: email.subject,
        html: email.html
    });
};