import { productRepository } from '../repositories/index.repositories.js';
import { ProductNotFound } from '../utils/custom-exceptions.utils.js';
import { deleteImg, getPublicId } from '../config/cloudinary.config.js';
import { verifyRole } from '../utils/utilsServices/users.utils.js';

const postProduct = async (body, imagesUrl) => {
    if (imagesUrl && imagesUrl.length > 0) body.img = imagesUrl[0];
    const result = await productRepository.postProduct(body);
    if (!result) throw new ProductNotFound('Error al guardar el producto');
    return { status: 'success' };
};

const getProducts = async ({ page = 1, limit = 12, brand, id, category, subcategory, active,
    notid, location, ids }) => {

    const query = {};
    const options = { page, limit };

    if (id) query._id = id;
    if (ids) query._id = { $in: ids.split(',') };
    if (notid) query._id = { $ne: notid };
    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (location) query.location = location;
    if (subcategory) query.subCategory = subcategory;
    if (active !== undefined) query.active = active;

    const result = await productRepository.getProducts(query, options);
    if (!result) throw new ProductNotFound('Error al traer los productos');
    return { status: 'success', result };
};

const putProductImg = async (body, imagesUrl) => {
    const product = await productRepository.getById(body.id);
    if (!product) throw new ProductNotFound('Error al tarer el producto');
    const result = await productRepository.update({ ...product, img: imagesUrl[0] });
    if (!result) throw new ProductNotFound('Error al actulizar el producto');
    const imgId = await getPublicId(product.img);
    if (imgId) await deleteImg(imgId);
    return { status: 'success', result };
};

const putOpportinity = async ({ password }, { user }) => {
    await verifyRole(password, user._id, ['master']);
    const products = await productRepository.getAllProducts({ location: 'opportunity' });
    if (!products) throw new ProductNotFound('Error al tarer las oportunidades');
    const notid = [];
    for (const product of products) {
        if (product.location === 'opportunity') {
            product.location = 'none';
            notid.push(product._id.toString());
            await productRepository.update(product);
        };
    };
    const result = [];
    const productRandom = await productRepository.getOpport(notid);
    if (!productRandom) throw new ProductNotFound('Error al tarer los productos random');
    for (const prod of productRandom) {
        prod.location = 'opportunity';
        result.push(prod);
        await productRepository.update(prod);
    };
    return { status: 'success', result };
};

const putProduct = async (body) => {
    const product = await productRepository.getById(body._id);
    if (!product) throw new ProductNotFound('Error al tarer el producto');
    if (product.family && (body.price !== product.price || body.discount !== product.discount || body.box !== product.box || body.cost !== product.cost)) {
        const products = await productRepository.getAllProducts({ family: body.family });
        if (!products) throw new ProductNotFound('Error al tarer los productos');
        const prodArray = [];
        for (const prod of products) {
            prod.price = body.price;
            prod.discount = body.discount;
            prod.box = body.box;
            prod.cost = body.cost;
            const prodUpdate = await productRepository.update(prod);
            if (!prodUpdate) throw new ProductNotFound('Error al actualizar el producto');
            prodArray.push(prodUpdate);
        };
        return { status: 'success', result: prodArray };
    } else {
        const result = await productRepository.update({ ...product, ...body });
        if (!result) throw new ProductNotFound('Error al actulizar el producto');
        return { status: 'success', result };
    };
};

export { postProduct, getProducts, putProductImg, putOpportinity, putProduct };