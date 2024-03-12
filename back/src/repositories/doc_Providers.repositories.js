import { docProviderManager } from '../dao/manager/index.manager.js';

export default class DocProvider {

    newDocProvider = async (docPay) => {
        const result = await docProviderManager.newDocProvider(docPay);
        return result;
    };
};