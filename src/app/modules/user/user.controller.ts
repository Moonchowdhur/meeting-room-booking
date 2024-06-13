import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  const { name, email, phone, role, address, _id } = result;
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'User registered successfully',
    data: {
      _id,
      name,
      email,
      phone,
      role,
      address,
    },
  });
});

export const UserControllers = {
  createUser,
};
