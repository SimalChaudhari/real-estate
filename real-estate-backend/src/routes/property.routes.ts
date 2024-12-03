import express from 'express';
import { createProperty, deleteProperty, getProperties, getPropertyById, updateProperty } from '../controllers/property.controller';
import { authenticateUser } from './../middleware/auth.middleware';

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', authenticateUser, createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;
