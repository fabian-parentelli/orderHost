import { messageModel } from '../models/message.model.js';

export default class Message {

    postMessage = async (message) => {
        return await messageModel.create(message);
    };

};