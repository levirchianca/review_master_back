import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserController } from "friend_of_all/controllers";
import UserDAOImpl from "../../typeorm/repositories/UserDAOImpl";

import AppError from '../../../errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const userController = new UserController(new UserDAOImpl());

    const user = await userController.ensuredAuthenticated(token);

    request.user = user;
    
    return next();
  } catch (error) {
    console.log(error);
    throw new AppError('Invalid token');
  }
}