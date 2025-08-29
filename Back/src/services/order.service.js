import { orderRepository, alertRepository } from '../repositories/index.repositories.js';
import { OrderNotFound } from '../utils/custom-exceptions.utils.js';
import { newOrderHtml } from '../utils/html/newOrderHtml.utils.js';
import { isUserUtils } from "../utils/utilsServices/users.utils.js";
import { sendEmail } from './email.service.js';

const postOrder = async (body) => {
    const { user, ...rest } = body;
    const isUser = await isUserUtils(user);
    const result = await orderRepository.postOrder({ ...rest, userId: isUser.userId });
    if (!result) throw new OrderNotFound('Error al crear la orden');
    await alertRepository.create({ eventId: result._id, userId: 'admin', type: 'newOrder' });
    const emailTo = {
        to: user.email,
        subject: 'Orden recibida',
        html: await newOrderHtml(user, result)
    };
    await sendEmail(emailTo);
    return {
        status: 'success',
        result,
        isUser: body._id ? true : false,
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

export { postOrder, getOrders, putStatus };