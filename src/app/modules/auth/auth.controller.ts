import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  const { userData, accessToken } = result;

  console.log(userData, 'userData');

  const { _id, name, email, phone, role, address } = userData;

  console.log(result, 'result');

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: { _id, name, email, phone, role, address },
  });
});

export const authController = {
  loginUser,
};
