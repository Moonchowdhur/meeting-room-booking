import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { meetingRoomRoute } from '../modules/room/room.route';
import { slotRoute } from '../modules/slot/slot.route';
import { bookingRoute } from '../modules/booking/booking.route';
import { auth } from '../middleware/auth';
import { BookingControllers } from '../modules/booking/booking.controller';

const router = express.Router();

const modeuleRoutes = [
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/rooms',
    route: meetingRoomRoute,
  },
  {
    path: '/slots',
    route: slotRoute,
  },
  {
    path: '/bookings',
    route: bookingRoute,
  },
];

router.get('/my-bookings', auth('user'), BookingControllers.getUserBooking);

modeuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
