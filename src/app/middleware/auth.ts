import { NextFunction, Request, Response } from 'express';
import appError from '../errors/appError';
import httpStatus from 'http-status';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';

export const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    const userData = await User.findOne({ email });

    console.log(userData, 'userData');
    if (!userData) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    if (requiredRole && !requiredRole.includes(role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
