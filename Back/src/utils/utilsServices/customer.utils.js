import { customerRepository } from '../../repositories/index.repositories.js';
import { UserNotFound } from '../custom-exceptions.utils.js';

const isCustomer = async (body) => {
    let result;
    if (!body._id) {
        const query = {};
        if (body.name) query.name = body.name;
        if (body.email) query.email = body.email;
        if (body.phone) query.phone = body.phone;
        const exist = await customerRepository.getOne(query);
        if (exist) throw new UserNotFound('El cliente ya existe');
        result = await customerRepository.postCustomer(body);
        if (!result) throw new UserNotFound('Error al crear el cliente');
    } else {
        const customer = await customerRepository.getOne({ _id: body._id });
        if (JSON.stringify(body) === JSON.stringify(customer)) result = customer;
        else result = await customerRepository.update({ ...customer, ...body });
    };
    return result._id.toString();
};

export { isCustomer };