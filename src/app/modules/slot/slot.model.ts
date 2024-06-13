import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>({
  room: { type: Schema.Types.ObjectId, ref: 'MeetingRoom', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

slotSchema.pre('find', function (next) {
  this.find({ isBooked: { $eq: false } });
  next();
});

export const Slot = model<TSlot>('Slot', slotSchema);
