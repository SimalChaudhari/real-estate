import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage }).array('images', 10); // Ensure the field name matches
