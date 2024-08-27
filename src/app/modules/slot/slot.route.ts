import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { slotValidation } from './slot.validation';
import { SlotControllers } from './slot.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(slotValidation.createSlotValidationSchema),
  SlotControllers.createRoom,
);

router.get('/availability', SlotControllers.getAllSlot);
router.get('/:id', SlotControllers.getSingleSlot);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(slotValidation.updateSlotValidationSchema),
  SlotControllers.updateSingleslot,
);

router.delete('/:id', auth('admin'), SlotControllers.deleteSingleSlot);

export const slotRoute = router;
