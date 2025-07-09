import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';
import { AuthUser } from '../types';

// Fixed credentials for the Alliance
const REBEL_USER: AuthUser = {
  username: 'Luke',
  password: 'DadSucks'
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check credentials
    if (username !== REBEL_USER.username || password !== REBEL_USER.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(username);

    res.json({
      message: 'Welcome to the Rebel Alliance, young Padawan!',
      token,
      user: { username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const verify = (req: Request, res: Response) => {
  res.json({ message: 'Token is valid', user: (req as any).user });
};