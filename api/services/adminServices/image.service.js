import cloudinary from '../../../utils/cloudinary.js';
import fs from 'fs';

export const uploadImage = async (localPath) => {
    try {
        const result = await cloudinary.uploader.upload(localPath);
        // fs.unlinkSync(localPath); // Remove local file
        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};
