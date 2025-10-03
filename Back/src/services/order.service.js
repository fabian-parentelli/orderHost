import { orderRepository } from '../repositories/index.repositories.js';
import { OrderNotFound } from '../utils/custom-exceptions.utils.js';
import { newOrderHtml } from '../utils/html/newOrderHtml.utils.js';
import { isCustomer } from '../utils/utilsServices/customer.utils.js';
import { isUserUtils } from "../utils/utilsServices/users.utils.js";
import { sendEmail } from './email.service.js';
import { verifyRole } from '../utils/utilsServices/users.utils.js';

const postSale = async (body) => {
    const { user, ...rest } = body;
    const userId = await isCustomer(user);
    const result = await orderRepository.postOrder({ ...rest, userId, type: 'sale' });
    if (!result) throw new OrderNotFound('Error al crear la orden');
    return { status: 'success' };
};

const postOrder = async (body) => {
    const { user, ...rest } = body;
    const isUser = await isUserUtils(user);
    const result = await orderRepository.postOrder({ ...rest, userId: isUser.userId, type: 'order' });
    if (!result) throw new OrderNotFound('Error al crear la orden');
    setImmediate(async () => {
        const emailTo = {
            to: user.email,
            subject: 'Orden recibida',
            html: await newOrderHtml(user, result)
        };
        await sendEmail(emailTo);
    });
    return {
        status: 'success',
        result,
        isUser: body.user._id ? true : false,
        accesToken: isUser?.accesToken || null
    };
};

const getOrders = async ({ page = 1, userid, active, status, id }) => {
    const query = {};
    if (id) query._id = id;
    if (userid) query.userId = userid;
    if (status) query.status = status;
    if (active !== undefined) query.active = active;
    const result = await orderRepository.getOrders(query, page);
    if (!result) throw new OrderNotFound('Error al obtener las ordenes');
    return { status: 'success', result };
};

const putStatus = async (body) => {
    const order = await orderRepository.getById(body.orderId);
    if (!order) throw new OrderNotFound('Error al obtener la orden');
    const result = await orderRepository.update({
        ...order, status: body.newStatus,
        active: (body.newStatus === 'delivered' || body.newStatus === 'returned') ? false : true
    });
    if (!result) throw new OrderNotFound('Error al actualizar la orden');
    return { status: 'success', result };
};

const deleteOrder = async ({ id, pass }, { user }) => {
    await verifyRole(pass, user._id, ['admin', 'master']);
    const result = await orderRepository.deleteOrder(id);
    if (!result) throw new OrderNotFound('Error al eliminar la orden');
    return { status: 'success' };
};

// borrar -----------------------------------------------
const getBorrar = async () => {
    const orders = await orderRepository.getOrders({}, 2)
    if (orders) {
        for (const order of orders.docs) {
            if (order.customer) delete order.customer;
            order.type = 'order'
            await orderRepository.update(order);
        }
    }
    return { status: 'success' };
};

export { postSale, postOrder, getOrders, putStatus, deleteOrder, getBorrar };