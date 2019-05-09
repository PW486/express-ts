import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { JWT_EXPIRE } from '../../../../config/environments';
import { User } from '../../user.entity';
import { getTokenByIdAction } from '../action/user.getTokenById';
import sendError from '../../../../utils/error';

interface PostSignUpBody {
  name: string;
  email: string;
  password: string;
}

export async function postSignUpHandler(req: Request, res: Response, next: NextFunction) {
  const body: PostSignUpBody = req.body;
  const name = body.name;
  const email = body.email;

  const oldUser = await getRepository(User).findOne({ email });
  if (oldUser) return sendError(400, 'email already in use', next);

  const password = await bcrypt.hash(body.password, 10);

  const newUser = getRepository(User).create({ name, email, password, permissions: ['admin'] });
  const user = await getRepository(User).save(newUser);

  const accessToken = await getTokenByIdAction(user.id);

  res.status(201).json({ access_token: accessToken, expires_in: JWT_EXPIRE });
}