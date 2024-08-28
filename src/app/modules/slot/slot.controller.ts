import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';

const createRoom = catchAsync(async (req, res) => {
  const { room, date, startTime, endTime } = req.body;
  const slotDuration = 60;
  const result = await SlotServices.createSlotIntoDB(
    room,
    date,
    startTime,
    endTime,
    slotDuration,
  );

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotFromDB(req.query);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  }
});

const getFullSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getFullSlotFromDB();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'All slots retrieved successfully',
      data: result,
    });
  }
});

const updateSingleslot = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SlotServices.updateSingleSlotFromDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Slot updated successfully',
    data: result,
  });
});

const deleteSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SlotServices.deleteSingleSlotFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Slot deleted successfully',
    data: result,
  });
});

const getSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log(id, 'slotId');

  const result = await SlotServices.getSingleSlotFromDB(id);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'slot retrieved successfully',
      data: result,
    });
  }
});

export const SlotControllers = {
  createRoom,
  getAllSlot,
  updateSingleslot,
  deleteSingleSlot,
  getSingleSlot,
  getFullSlot,
};
