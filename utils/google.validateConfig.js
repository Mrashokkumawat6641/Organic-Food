export default function validateConfig(config, requiredKeys) {
    for (const key of requiredKeys) {
        if (!config[key]) {
            throw new Error(`Missing required config key: ${key}`);
        }
    }
}
