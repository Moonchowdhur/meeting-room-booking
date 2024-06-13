import { Types } from 'mongoose';

export type TBooking = {
  room: Types.ObjectId;
  date: Date;
  slots: [Types.ObjectId];
  user: Types.ObjectId;
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed' | 'canceled';
  isDeleted: boolean;
};
