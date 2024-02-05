import passport from 'passport';
import jwt from 'passport-jwt';
import config from './dotEnv.config.js';

const JWTStrategy = jwt.Strategy;
const EXTRACTJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: EXTRACTJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.privateKeyPassport
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            console.log(error);
            return done(error);
        };
    }));
};

export default initializePassport;