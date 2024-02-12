import User from './users.manager.js';
import Product from './products.manager.js';
import Order from './orders.manager.js';
import Provider from './providers.manager.js';

export const userManager = new User();
export const productManager = new Product();
export const orderManager = new Order();
export const providerManager = new Provider();