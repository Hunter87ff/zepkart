import { cloudinaryConfig } from '@config/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
});
