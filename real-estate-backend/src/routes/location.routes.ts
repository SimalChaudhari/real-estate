import express from 'express';
import { authenticateUser } from './../middleware/auth.middleware';
import { createCity, getCities } from '../controllers/properties/city.controller';
import { createState } from '../controllers/properties/state.controller';

const router = express.Router();


// City
router.post('/city/create', createCity);
router.get('/city/list', getCities);


// state / locations
router.post('/state/create', createState);

export default router;
