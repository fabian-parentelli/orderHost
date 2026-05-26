import { isValidObjectId } from "../validations.val.js";
import { ErrorNotFound } from "../../utils/custom-exceptions.utils.js";

const postOrder = (body) => {

    const bodyKeys = Object.keys(body);
    if (bodyKeys.length !== 1 || bodyKeys[0] !== 'cart') {
        throw new ErrorNotFound("El cuerpo de la petición contiene propiedades no permitidas o inválidas.");
    };

    const { cart } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
        throw new ErrorNotFound("El carrito está vacío o no es un formato válido.");
    };

    for (const item of cart) {
        const itemKeys = Object.keys(item);
        const allowedKeys = ['pid', 'quantity', 'price'];

        const hasExtraKeys = itemKeys.length !== allowedKeys.length || !itemKeys.every(key => allowedKeys.includes(key));

        if (hasExtraKeys) {
            throw new ErrorNotFound("Se detectaron propiedades no permitidas dentro de los artículos del carrito.");
        };

        const { pid, quantity, price } = item;

        if (!pid || !isValidObjectId(pid)) {
            throw new ErrorNotFound(`El ID de producto '${pid}' no es un ObjectId válido.`);
        };

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new ErrorNotFound(`La cantidad (${quantity}) debe ser un número entero mayor a 0.`);
        };

        if (!Number.isInteger(price) || price <= 0) {
            throw new ErrorNotFound(`El precio (${price}) debe ser un número entero mayor a 0.`);
        };

    };

    return cart;
};

export { postOrder };