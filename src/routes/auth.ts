import { Router } from 'express';
import { login } from '../controllers/authController';
import { validateRequest, loginValidationSchema } from '../middleware/validation';

const router = Router();

router.post('/login', validateRequest(loginValidationSchema), login);

export default router; 