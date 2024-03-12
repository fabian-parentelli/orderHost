import moment from 'moment';
import { sendEmail } from './emial.services.js';
import { OredrNotFound } from '../utils/custom-exceptions.utils.js';
import { orderToCustomerHTML } from '../utils/html/orderToCustomer.utils.js';
import { orderRepository } from '../repositories/index.repositories.js';
import { userRepository } from '../repositories/index.repositories.js';

const saveOrder = async (order) => {

    console.log(order);

    const newOrder = {
        cart: order.cart.map((prod) => ({
            product: prod._id,
            quantity: prod.quantity,
            price: prod.price
        })),
        customer: order.customer._id ? { id: order.customer._id } : order.customer,
        date: moment().format('DD-MM-YYYY HH:mm')
    };
    if (order.customer.email) {
        const orderToEmail = {
            ...newOrder,
            cart: order.cart.map((prod) => ({
                name: prod.name, quantity: prod.quantity, price: prod.price
            })),
            customer: {
                name: order.customer.name,
                address: order.customer.address,
                phone: order.customer.phone
            }
        };
        const emailTo = {
            to: order.customer.email,
            subject: 'Pedido enviado correctamente',
            html: await orderToCustomerHTML(orderToEmail)
        };
        await sendEmail(emailTo);
    };
    const result = await orderRepository.saveOrder(newOrder);
    if (!result) throw new OredrNotFound('No se puede crear la orden del pedido');
    return { status: 'success', message: 'Orden creada correctamente gracias por tu pedido' };
};

const getOrders = async (active, page, user) => {
    let query = {};
    if (user.role !== 'admin') query = { customer: { id: user._id } }
    if (active === true) query = { active: active };
    const result = await orderRepository.getOrders(query, page);
    const { docs, ...paginate } = result;
    const promises = result.docs.map(async (ord) => {
        if (ord.customer && ord.customer.id) {
            const customer = await userRepository.getById(ord.customer.id);
            ord.customer.name = customer.name;
            ord.customer.phone = customer.phone;
            ord.customer.address = customer.address;
        }
        return ord;
    });
    const document = await Promise.all(promises);
    const data = { ...paginate, document }
    return { status: 'success', data };
};

const getOrderById = async (id) => {
    const result = await orderRepository.getOrderById(id);
    if (!result) throw new OredrNotFound('No se encuentra la orden');
    if (result.customer.id) {
        const customer = await userRepository.getById(result.customer.id);
        result.customer.name = customer.name;
        result.customer.address = customer.address;
        result.customer.email = customer.email;
        result.customer.phone = customer.phone;
        delete result.customer.id
    };
    return { status: 'success', result };
};

const updateActive = async (id) => {
    const order = await orderRepository.getOrderById(id);
    if (!order) throw new OredrNotFound('Orden no encontrada');
    order.active = !order.active
    const updateOrder = await orderRepository.updateOrder(order);
    if (!updateOrder) throw new OredrNotFound('No se puede guardar la orden');
    return { status: 'success', updateOrder };
};

export { saveOrder, getOrders, getOrderById, updateActive };