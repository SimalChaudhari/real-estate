import express from 'express';
import { authenticateUser } from './../middleware/auth.middleware';
import { upload } from '../middleware/multer';
import { createListing, deleteListing, getListingById, getListings, updateListing } from '../controllers/properties/properties.controller';

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/create', upload, authenticateUser, createListing);
router.put('/update/:id', upload, updateListing);
router.delete('/delete/:id', deleteListing);


export default router;
