import { productManager } from '../manager/index.manager.js';

const getProductByOrder = async (order) => {
    
    for (const cart of order.cart) {
        const product = await productManager.getById(cart.pid);
        cart.name = `${product.name} ${product.brand} ${product.description}`;
        cart.img = product.img;
    };

    return order;
};

export { getProductByOrder };