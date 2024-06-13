import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { TLoginUser } from './auth.interface';
import appError from '../../errors/appError';
import { User } from '../user/user.model';

import config from '../../config';
import { createToken } from './auth.utils';

const loginUserFromDB = async (payload: TLoginUser) => {
  console.log(payload, 'payload');
  const userData = await User.findOne({ email: payload?.email });
  console.log(userData, 'userData');
  if (!userData) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData?.password,
  );
  if (!isPasswordMatched) {
    throw new appError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  //access granted ---->login
  //create token and sent to the client--------->

  const jwtPayload = {
    email: userData?.email,
    role: userData?.role,
  };

  console.log(jwtPayload, 'jwtPayload');

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken, userData };
};

export const AuthServices = {
  loginUserFromDB,
};
