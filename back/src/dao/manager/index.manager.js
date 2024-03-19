import User from './users.manager.js';
import Product from './products.manager.js';
import Order from './orders.manager.js';
import Provider from './providers.manager.js';
import DocProvider from './doc_providers.manager.js';
import News from './news.manager.js';
import UpDate from './upDate.manager.js';

export const userManager = new User();
export const productManager = new Product();
export const orderManager = new Order();
export const providerManager = new Provider();
export const docProviderManager = new DocProvider();
export const newsManager = new News();
export const upDateManager = new UpDate();