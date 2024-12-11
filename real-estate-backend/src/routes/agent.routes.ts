import express from 'express';
import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from '../controllers/agent/agent.controller';

const router = express.Router();

// CRUD Routes
router.post('/create', createAgent);
router.get('/get', getAgents);
router.get('/:id', getAgentById);
router.put('/update/:id', updateAgent);
router.delete('/delete/:id', deleteAgent);

export default router;
