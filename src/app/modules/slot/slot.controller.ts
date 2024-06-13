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

  console.log(result, 're');

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

export const SlotControllers = {
  createRoom,
  getAllSlot,
};
