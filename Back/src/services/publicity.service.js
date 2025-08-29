import { publicityRepository } from '../repositories/index.repositories.js';
import { PublicityNotFound } from '../utils/custom-exceptions.utils.js';

const postPublicity = async (body, imagesUrl) => {
    if (imagesUrl && imagesUrl.length > 0) body.img = imagesUrl;
    const result = await publicityRepository.postPublicity(body);
    if (!result) throw new PublicityNotFound('Error al guardar la publicidad');
    return { status: 'success' };
};

const getPublicities = async ({ page = 1, id, type, active }) => {
    const query = {};
    if (id) query._id = id;
    if (type) query.type = type;
    if (active !== undefined) query.active = active;
    const result = await publicityRepository.getPublicities(query, page);  
    if (!result) throw new PublicityNotFound('Error, al traer las publicidades');
    return { status: 'success', result };
};

const putPublicity = async (body) => {
    const publicity = await publicityRepository.getById(body._id);
    if (!publicity) throw new PublicityNotFound('Error al traer la publicidad');
    const result = await publicityRepository.update({ ...publicity, ...body });
    if (!result) throw new PublicityNotFound('Error, al traer las publicidades');
    return { status: 'success', result };
};

export { postPublicity, getPublicities, putPublicity };