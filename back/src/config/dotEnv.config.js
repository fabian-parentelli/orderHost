import dotEnv from 'dotenv';

dotEnv.config();

export default {
    port: process.env.PORT,
    privateKeyPassport: process.env.PRIVATEKEYPASSPORT,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    privateKey: process.env.PRIVATEKEY,
    userNodemailer: process.env.USERNODEMAILER,
    passNodemailer: process.env.PASSNODEMAILER,
    mongoDB: process.env.MONGODB,
};