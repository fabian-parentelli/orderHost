import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import mongoDB from './dao/mongo.js';
import cors from 'cors';
import env from './config/dotEnv.config.js';

import { 
    userRouter, productRouter, orderRouter, providerRouter, newsRouter, upDateRouter 
} from './routes/index.routers.js';

const app = express();
mongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/provider', providerRouter);
app.use('/api/news', newsRouter);
app.use('/api/date', upDateRouter);

app.listen(env.port, () => console.log('Server Conected'));