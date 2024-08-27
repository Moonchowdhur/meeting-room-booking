import { z } from 'zod';

const meetingRoomValidationSchema = z.object({
  body: z.object({
    // image: z
    //   .string()
    //   .url('Image must be a valid URL')
    //   .min(1, 'Image is required'),

    image: z
      .array(z.string().url('Each image must be a valid URL'))
      .min(2, 'At least two image is required'),

    name: z.string().min(1, 'Name is required'),
    roomNo: z.number().min(1, 'Room number is required'),
    floorNo: z.number().min(0, 'Floor number is required'),
    capacity: z.number().min(1, 'Capacity is required'),
    pricePerSlot: z.number().min(0, 'Price per slot is required'),
    amenities: z
      .array(z.string().min(1))
      .min(1, 'At least one amenity is required'),
  }),
});

const updateMeetingRoomValidationSchema = z.object({
  body: z.object({
    image: z
      .array(z.string().url('Each image must be a valid URL'))
      .min(2, 'At least one image is required')
      .optional(),
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    capacity: z.number().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string().min(1)).optional(),
  }),
});

export const meetingRoomValidation = {
  meetingRoomValidationSchema,
  updateMeetingRoomValidationSchema,
};
