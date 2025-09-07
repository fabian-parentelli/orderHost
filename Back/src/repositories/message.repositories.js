import { messageManager } from '../dao/manager/index.manager.js';

export default class MessageRepository {

    postMessage = async (message) => {
        const result = await messageManager.postMessage(message);
        return result;
    };

};