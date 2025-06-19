import { Router } from 'express';
import { 
  getProfile, 
  getUser, 
  getUsers, 
  updateUserProfile, 
  deleteUserProfile 
} from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest, updateUserValidationSchema, userValidationSchema } from '../middleware/validation';
import { register } from '../controllers/authController';

const router = Router();

// Public routes
router.get('/', getUsers);
router.post('/', validateRequest(userValidationSchema), register);
router.get('/:id', getUser);

// Protected routes (require authentication)
router.get('/profile/me', authenticateToken, getProfile);
router.put('/profile/me', authenticateToken, validateRequest(updateUserValidationSchema), updateUserProfile);
router.delete('/profile/me', authenticateToken, deleteUserProfile);

export default router; 