import { uploadImage } from '../../services/adminServices/image.service.js';

export const uploadImageController = async (req, res) => {
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Upload an image'
  // #swagger.description = 'This endpoint allows users to upload an image file.'
  /*  #swagger.parameters['image'] = {
      in: 'formData',
      description: 'Image file to upload',
      required: true,
      type: 'file',
      schema: {
        type: 'string',
        format: 'binary'
      }
    } */
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
