import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = User.create(payload);
  return result;
};

const getSingleUser = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getSingleUser,
};
