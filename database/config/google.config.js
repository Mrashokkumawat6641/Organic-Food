import validateConfig from '../../utils/google.validateConfig.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../env.js';


const config = {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    
};


validateConfig(config, ['clientId', 'clientSecret']);

export default config;
