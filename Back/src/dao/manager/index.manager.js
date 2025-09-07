import User from './users.manager.js';
import Activity from './activity.manager.js';
import Alerts from './alerts.manager.js';
import Config from './config.manager.js';
import Avatar from './avatar.manager.js';
import Product from './product.manager.js';
import Publicity from './publicity.manager.js';
import Order from './order.manager.js';
import Message from './message.manager.js';

export const userManager = new User();
export const activityManager = new Activity();
export const alertManager = new Alerts();
export const configManager = new Config();
export const avatarManager = new Avatar();
export const productManager = new Product();
export const publicityManager = new Publicity();
export const orderManager = new Order();
export const messageManager = new Message();