import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { meetingRoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(meetingRoomValidation.meetingRoomValidationSchema),
  RoomControllers.createRoom,
);

router.get('/', RoomControllers.getAllRoom);

router.get('/:id', RoomControllers.getSingleRoom);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(meetingRoomValidation.updateMeetingRoomValidationSchema),
  RoomControllers.updateSingleRoom,
);

router.delete('/:id', auth('admin'), RoomControllers.deleteSingleRoom);

export const meetingRoomRoute = router;
