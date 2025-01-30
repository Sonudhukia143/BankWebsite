import { v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import dotenv from 'dotenv';
import multer from 'multer';

if( process.env.NODE_ENV !== "production" ) {
    dotenv.config();
}

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:'BankWeb',
        allowedFormats: ['jpg','jpeg','png']
    }
});

const upload = multer({storage:storage});

export { cloudinary,storage,upload };