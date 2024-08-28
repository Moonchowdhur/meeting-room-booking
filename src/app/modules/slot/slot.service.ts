/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import appError from '../../errors/appError';
import { MeetingRoom } from '../room/room.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

// const createSlotIntoDB = async (
//   room: string,
//   date: string,
//   startTime: string,
//   endTime: string,
//   slotDuration: number,
// ): Promise<TSlot[]> => {
//   //room exist or not
//   const isroomExists = await MeetingRoom.findById(room);

//   if (!isroomExists) {
//     throw new appError(httpStatus.NOT_FOUND, 'Room not found !');
//   }

//   const startMinutes = timeToMinutes(startTime);
//   const endMinutes = timeToMinutes(endTime);
//   const totalDuration = endMinutes - startMinutes;

//   const numberOfSlots = totalDuration / slotDuration;

//   const slots: TSlot[] = [];

//   for (let i = 0; i < numberOfSlots; i++) {
//     const slotStartMinutes = startMinutes + i * slotDuration;
//     const slotEndMinutes = slotStartMinutes + slotDuration;

//     const slotStartTime = minutesToTime(slotStartMinutes);
//     const slotEndTime = minutesToTime(slotEndMinutes);

//     const slot = await Slot.create({
//       room,
//       date,
//       startTime: slotStartTime,
//       endTime: slotEndTime,
//       isBooked: false,
//     });

//     slots.push(slot);
//   }

//   return slots;
// };

const createSlotIntoDB = async (
  room: string,
  date: string,
  startTime: string,
  endTime: string,
  slotDuration: number,
): Promise<TSlot[]> => {
  //room exist or not
  const isroomExists = await MeetingRoom.findById(room);

  if (!isroomExists) {
    throw new appError(httpStatus.NOT_FOUND, 'Room not found !');
  }

  const isRoomDeleted = isroomExists?.isDeleted;
  if (isRoomDeleted) {
    throw new appError(httpStatus.NOT_FOUND, 'Room is deleted!');
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / slotDuration;

  const slots: TSlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * slotDuration;
    const slotEndMinutes = slotStartMinutes + slotDuration;

    const slotStartTime = minutesToTime(slotStartMinutes);
    const slotEndTime = minutesToTime(slotEndMinutes);

    //checking conflict
    // Check if any slots with the same room, date, and overlapping time range exist
    const existingSlots = await Slot.find({
      room,
      date,
      $or: [
        { startTime: { $lt: slotEndTime }, endTime: { $gt: slotStartTime } }, // Overlapping
        { startTime: { $gte: slotStartTime, $lt: slotEndTime } }, // Starts within new slot
        { endTime: { $gt: slotStartTime, $lte: slotEndTime } }, // Ends within new slot
      ],
    });

    if (existingSlots.length > 0) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        'This slot is not available at that time! Choose other time or day',
      );
    }

    const slot = await Slot.create({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });

    slots.push(slot);
  }

  return slots;
};

const getAllSlotFromDB = async (query: Record<string, unknown>) => {
  const { roomId, date } = query;

  const queryObject: Record<string, unknown> = {};
  if (roomId) {
    queryObject.room = roomId;
  }
  if (date) {
    queryObject.date = date;
  }

  const result = await Slot.find(queryObject).populate('room');
  return result;
};

// const getAllSlotFromDB = async (query: Record<string, unknown>) => {
//   const { roomId, date } = query;

//   // Build the query object with the provided filters
//   const queryObject: Record<string, unknown> = {
//     isBooked: { $eq: false }, // Ensure only unbooked slots are returned
//   };

//   if (roomId) {
//     queryObject.room = roomId;
//   }
//   if (date) {
//     queryObject.date = date;
//   }

//   // Execute the query and populate the 'room' field
//   const result = await Slot.find(queryObject).populate('room');
//   return result;
// };

const getFullSlotFromDB = async () => {
  const result = Slot.find();
  return result;
};

const updateSingleSlotFromDB = async (id: string, payload: any) => {
  // Check if the slot exists
  const isSlotExist = await Slot.findById(id);
  console.log(isSlotExist, 'isSlotExist');
  console.log(payload, 'payload');

  if (!isSlotExist) {
    throw new appError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  // Check if the slot is already booked
  if (isSlotExist?.isBooked === true) {
    throw new appError(httpStatus.CONFLICT, 'Slot already booked');
  }

  const isRoomExists = await MeetingRoom.findById(payload?.room);

  if (!isRoomExists) {
    throw new appError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleSlotFromDB = async (id: string) => {
  //  slot exists
  const isSlotExist = await Slot.findById(id);

  if (!isSlotExist) {
    throw new appError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  // slot is already booked
  if (isSlotExist?.isBooked) {
    throw new appError(
      httpStatus.CONFLICT,
      "Slot already booked, can't delete",
    );
  }

  const result = await Slot.findByIdAndDelete(id);

  if (!result) {
    throw new appError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete slot',
    );
  }

  return result;
};

const getSingleSlotFromDB = async (id: string) => {
  const result = await Slot.findById(id);
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotFromDB,
  updateSingleSlotFromDB,
  deleteSingleSlotFromDB,
  getSingleSlotFromDB,
  getFullSlotFromDB,
};
