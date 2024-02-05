import nodemailer from 'nodemailer';
import env from '../config/dotEnv.config.js';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: env.userNodemailer,
        pass: env.passNodemailer
    },
    tls: { rejectUnauthorized: false }
});