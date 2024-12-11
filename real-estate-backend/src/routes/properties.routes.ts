import express from 'express';
import { authenticateUser } from './../middleware/auth.middleware';
import { createListing, deleteListing, getListingById, getListings, updateListing } from '../controllers/properties.controller';
import { upload } from '../middleware/multer';

const router = express.Router();

router.get('/get', getListings);
router.get('/:id', getListingById);
router.post('/create', upload, authenticateUser, createListing);
router.put('/update/:id', upload, updateListing);
router.delete('/delete/:id', deleteListing);

export default router;
