import express from 'express';
import { uploadImageController } from '../../controllers/adminControllers/image.controller.js';
import upload from '../../../middlewares/multer.js';

const router = express.Router();

/**
 * @route POST /api/image/upload
 * @group Image - Image upload operations
 * @param {file} image.formData.required - Image file to upload
 * @returns {object} 200 - Success message with uploaded image info
 * @returns {object} 400 - Bad request, if image missing or invalid
 */
router.post('/upload', upload.single('image'), uploadImageController);

export default router;
