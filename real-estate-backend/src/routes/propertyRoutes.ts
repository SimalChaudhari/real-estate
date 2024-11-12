import express from 'express';
import { getProperties, addProperty } from '../controllers/propertyController';

const router = express.Router();

router.get('/', getProperties);
router.post('/', addProperty);

export default router;
