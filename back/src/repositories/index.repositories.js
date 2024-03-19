import UserRepository from "./users.repositories.js";
import ProductRepository from "./products.repositories.js";
import OrderRepository from './orders.repositories.js'
import ProviderRepository from './providers.repositories.js';
import DocProvider from "./doc_Providers.repositories.js";
import NewsRepository from './news.repositories.js';
import UpDateRepository from './upDate.repositories.js';

export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();
export const orderRepository = new OrderRepository();
export const providerRepository = new ProviderRepository();
export const docProviderRepository = new DocProvider();
export const newsRepository = new NewsRepository();
export const upDateRepository = new UpDateRepository();