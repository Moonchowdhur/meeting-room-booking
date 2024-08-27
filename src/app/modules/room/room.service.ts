import httpStatus from 'http-status';
import appError from '../../errors/appError';
import { TRoom } from './room.interface';
import { MeetingRoom } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const result = MeetingRoom.create(payload);
  return result;
};

const getAllRoomFromDB = async () => {
  const result = MeetingRoom.find({ isDeleted: false });
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await MeetingRoom.findById(id);
  return result;
};

const updateSingleRoomFromDB = async (id: string, payload: Partial<TRoom>) => {
  const isRoomExist = await MeetingRoom.findById(id);

  if (!isRoomExist) {
    throw new appError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const { amenities } = payload;

  if (amenities && amenities.length === 0) {
    throw new appError(httpStatus.BAD_REQUEST, 'amenities should not be null');
  }

  const result = await MeetingRoom.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleRoomFromDB = async (id: string) => {
  const isRoomExist = await MeetingRoom.findById(id);

  if (!isRoomExist) {
    throw new appError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const result = await MeetingRoom.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomFromDB,
  updateSingleRoomFromDB,
  deleteSingleRoomFromDB,
};
