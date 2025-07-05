import cloudinary from '../../../utils/cloudinary.js';
import fs from 'fs';


export const uploadImage = async (localPath) => {
    try {
        const allowedFormats = [
            'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'pdf'
        ];
        const result = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto',
            allowed_formats: allowedFormats
        });
        // fs.unlinkSync(localPath); // Remove local file
        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        if (error.response && error.response.body) {
            throw new Error('File upload failed: ' + JSON.stringify(error.response.body));
        }
        throw new Error('File upload failed: ' + (error.message || error.toString()));
    }
};
