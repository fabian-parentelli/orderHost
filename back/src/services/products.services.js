import { productRepository } from '../repositories/index.repositories.js';
import { ProductsNotFound } from '../utils/custom-exceptions.utils.js';
import { getPublicId, deleteImg } from '../config/cloudinary.config.js';

const createProduct = async (product, imgName, imgUrl) => {
    const areProduct = await productRepository.getByName(product.name);
    if (areProduct) {
        const publicId = getPublicId(imgUrl);
        await deleteImg(publicId);
        throw new ProductsNotFound('El producto ya existe');
    };
    product.img = { imgName, imgUrl };
    const result = await productRepository.createProduct(product);
    if (!result) throw new ProductsNotFound('El producto non se pudo guardar');
    return { status: 'success', result };
};

const getAll = async (limit, page, category, active) => {
    let query = {};
    if (active === true) query.active = true;
    if (category) query.category = { $regex: category, $options: "i" };
    const products = await productRepository.getAll(query, limit, page);
    if (!products) throw new ProductsNotFound('No se encuentran los productos');
    return { status: 'success', products };
};


const getById = async (id) => {
    const product = await productRepository.getById(id);
    if (!product) throw new ProductsNotFound('Producto no encontrado');
    return { status: 'success', product };
};

const lookFor = async (name) => {
    const result = await productRepository.lookFor(name)
    if (!result) throw new ProductsNotFound('No se encuentran los productos');
    return result;
};

const getSaleTrue = async () => {
    const result = await productRepository.getSaleTrue();
    if (!result) return { status: 'error', error: 'No hay ofertas activas' };
    return { status: 'success', result };
};

const setActive = async (id) => {
    const product = await productRepository.getById(id);
    if (!product) throw new ProductsNotFound('Producto no encontrado');
    product.active = !product.active;
    const result = await productRepository.update(product);
    if (!result) throw new ProductsNotFound('No se puede modificar el producto');
    return { status: 'success' };
};

const updateProduct = async (product, imgName, imgUrl, id) => {
    const productDb = await productRepository.getById(id);
    if (!productDb) throw new ProductsNotFound('Producto no encontrado');
    const newProduct = { ...productDb, ...product };
    if (imgName) newProduct.img.imgName = imgName;
    if (imgUrl) newProduct.img.imgUrl = imgUrl;
    const result = await productRepository.update(newProduct);
    if (!result) throw new ProductsNotFound('No se puede modificar el producto');
    return { status: 'success', newProduct };
};

const updSale = async (sale, id) => {
    const productDb = await productRepository.getById(id);
    if (!productDb) throw new ProductsNotFound('no se encuentra el producto');
    productDb.sale = sale;
    const result = await productRepository.update(productDb);
    if (!result) throw new ProductsNotFound('No se puede modificar el producto');
    return { status: 'success', result };
};

const updSaleActive = async (id) => {
    const productDb = await productRepository.getById(id);
    if (!productDb) throw new ProductsNotFound('No se encuentre el producto');
    productDb.sale.active = !productDb.sale.active;
    const result = await productRepository.update(productDb);
    if (!result) throw new ProductsNotFound('No se puede modificar el producto');
    return { status: 'success', result };
};

export {
    createProduct, getAll, lookFor, getSaleTrue, setActive, getById, updateProduct, updSale, updSaleActive
}; 