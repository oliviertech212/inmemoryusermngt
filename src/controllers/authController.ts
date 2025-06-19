import { Request, Response } from 'express';
import { createUser, getUserByEmail, verifyPassword } from '../models/user';
import { generateToken } from '../middleware/auth';
import { CreateUserRequest, LoginRequest, AuthResponse, ApiResponse } from '../types';

export const register = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserRequest = req.body;
    
    // Check if user already exists
    const existingUser = getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    const user = await createUser(userData);
    const token = generateToken(user.id);
    
    const { password, ...userWithoutPassword } = user;
    const response: AuthResponse = {
      token,
      user: userWithoutPassword
    };

    res.status(201).json({
      success: true,
      data: response,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginRequest = req.body;
    
    const user = getUserByEmail(loginData.email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const isValidPassword = await verifyPassword(loginData.password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const token = generateToken(user.id);
    const { password, ...userWithoutPassword } = user;
    const response: AuthResponse = {
      token,
      user: userWithoutPassword
    };

    res.json({
      success: true,
      data: response,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}; 