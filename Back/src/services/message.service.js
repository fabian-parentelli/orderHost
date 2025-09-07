import { messageRepository, alertRepository } from '../repositories/index.repositories.js';
import { MessageNotFound } from '../utils/custom-exceptions.utils.js';

const postMessage = async (body) => {
    if (body._id) {
        delete body.name;
        delete body.email;
        delete body.phone;
        body.user = body._id;
        delete body._id;
    };
    const result = await messageRepository.postMessage(body);
    if (!result) throw new MessageNotFound('Error al traer los mensajes');
    await alertRepository.create({ userId: result._id, userId: body.to, type: 'postMessage' });
    return { status: 'success', result };
};

export { postMessage };