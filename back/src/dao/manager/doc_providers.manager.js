import { docProviderModel } from '../models/doc_providers.model.js';

export default class DocProvider {

    newDocProvider = async (docPay) => {
        return await docProviderModel.create(docPay);
    };

};