import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  const { userData, accessToken } = result;

  const { _id, name, email, phone, role, address } = userData;

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
