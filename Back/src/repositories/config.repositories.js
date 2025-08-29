import { configManager } from '../dao/manager/index.manager.js';

export default class ConfigRepository {
    
    getConfig = async () => {
        const result = await configManager.getConfig();
        return result;
    };

    update = async (config) => {
        const result = await configManager.update(config);
        return result;
    };

};