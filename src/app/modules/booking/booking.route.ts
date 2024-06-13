import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', auth('admin'), BookingControllers.getAllBooking);

router.put('/:id', auth('admin'), BookingControllers.updateSingleBooking);
router.delete('/:id', auth('admin'), BookingControllers.deleteSingleBooking);

export const bookingRoute = router;
