import { uploadImage } from '../../services/adminServices/image.service.js';

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const data = await uploadImage(req.file.path);

    res.status(200).json({
      message: 'Image uploaded successfully',
      ...data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
