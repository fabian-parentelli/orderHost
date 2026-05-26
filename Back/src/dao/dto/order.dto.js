import { productManager } from '../manager/index.manager.js';

const getProductByOrder = async (order) => {

    const ids = order.cart.map(cart => cart.pid);
    const products = await productManager.getAllProducts(
        { _id: { $in: ids } },
        { name: 1, brand: 1, description: 1, img: 1 }
    );

    for (const cart of order.cart) {
        const product = products.find(doc => doc._id.toString() === cart.pid.toString());
        if (product) {
            cart.name = `${product.name} ${product.brand} ${product.description}`;
            cart.img = product.img;
        };
    };
    
    return order;
};

export { getProductByOrder };