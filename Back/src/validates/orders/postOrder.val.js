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

    return cart;
};

export { postOrder };