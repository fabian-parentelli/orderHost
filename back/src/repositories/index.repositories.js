import UserRepository from "./users.repositories.js";
import ProductRepository from "./products.repositories.js";
import OrderRepository from './orders.repositories.js'
import ProviderRepository from './providers.repositories.js';

export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();
export const orderRepository = new OrderRepository();
export const providerRepository = new ProviderRepository();