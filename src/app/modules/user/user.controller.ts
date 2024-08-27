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

const getSingleUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getSingleUser(email);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'User retrieved successfully',
      data: result,
    });
  }
});

export const UserControllers = {
  createUser,
  getSingleUserByEmail,
};
