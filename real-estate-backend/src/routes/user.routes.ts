import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);            // GET /users - Get all users
router.get('/:id', getUserById);          // GET /users/:id - Get user by ID
router.put('/update/:id', updateUser);           // PUT /users/:id - Update user by ID
router.delete('/:id', deleteUser);        // DELETE /users/:id - Delete user by ID

export default router;
