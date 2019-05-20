import { User } from '@app/api/user/user.entity';
import { JWT_EXPIRE } from '@app/config/environments';
import sendError from '@app/utils/error';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getTokenByIdAction } from '../action/user.getTokenById';

interface PostSignInBody {
  email: string;
  password: string;
}

export async function postSignInHandler(req: Request, res: Response, next: NextFunction) {
  const body: PostSignInBody = req.body;
  const email = body.email;
  const password = body.password;

  const user = await getRepository(User).findOne({ email });
  if (!user) return sendError(400, 'invalid email or password', next);

  const result = await bcrypt.compare(password, user.password);
  if (!result) return sendError(400, 'invalid email or password', next);

  const accessToken = await getTokenByIdAction(user.id);

  res.status(200).json({ access_token: accessToken, expires_in: JWT_EXPIRE });
}
