import { transporter } from '../utils/nodeMailer.utils.js';

export const sendEmail = async (email) => {
    try {
        await transporter.sendMail({
            from: 'La colonial',
            to: email.to,
            subject: email.subject,
            html: email.html
        });
    } catch (error) {
        console.log(error);
    };
};