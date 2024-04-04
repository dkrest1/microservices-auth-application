import variables from '@/configs/constants.config';
import { _NextFunction, _Request, _Response } from '@/types';
import jwt from 'jsonwebtoken';

// User interface representing user data
interface User {
  id: string;
  email: string;
}

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email
  };

  const options: jwt.SignOptions = {
    expiresIn: variables.JWT_EXPIRATION
  };

  return jwt.sign(payload, variables.JWT_SECRET, options);
}

export async function validateToken(token: string) {
 
  if (!token) {
    return { status: 401, message: "No token provided", data: null};
  }

  try {
    const decoded = jwt.verify(token, variables.JWT_SECRET) as User;
    return { status: 200, message: 'Token validated successfully', data: decoded };
  } catch (error) {
    return { status: 401, message: 'Failed to authenticate token', data: null };
  }
}
