import express from 'express';
import { authenticateUser } from './../middleware/auth.middleware';
import { createStateWithCities, getStatesWithCities } from '../controllers/properties/state.controller';

const router = express.Router();


router.post('/create', createStateWithCities);
router.get('/get', getStatesWithCities);

export default router;
