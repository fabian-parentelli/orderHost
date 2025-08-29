import jwt from 'jsonwebtoken';
import config from '../config/dotEnv.config.js';

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey);
    return token;
};

const passwordToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: '1h' });
    return token;
};

export { generateToken, passwordToken };