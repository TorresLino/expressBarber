import express from "express";
import * as barberController from "../controllers/barber.js";
import * as userController from "../controllers/user.js";
import * as serviceController from "../controllers/service.js";
import * as bookingController from "../controllers/booking.js";
import * as timeSlotController from "../controllers/timeSlot.js";
const router = express.Router();

router.get('/barber', barberController.getBarbers);
router.get('/barber/:id', barberController.getBarberById);
router.post('/barber', barberController.postBarber);
router.delete('/barber/:id', barberController.deleteBarber);

router.get('/user', userController.getUsers);
router.post('/user', userController.postUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/service', serviceController.getServices);
router.post('/service', serviceController.postService);
router.delete('/service/:id', serviceController.deleteService);
router.get('/service-by-code/:code', serviceController.getServiceByCode);

router.get('/booking', bookingController.getAllBookings);
router.post('/booking', bookingController.postBooking);
router.delete('/booking/:id', bookingController.deleteBooking);
router.get('/booking-times/:date', bookingController.getBookingTimesForDate);

router.get('/timeSlot', timeSlotController.getTimeSlots);
router.get('/timeslot/:id', timeSlotController.getTimeSlotById);
router.post('/timeSlot', timeSlotController.postTimeSlot);
router.delete('/timeSlot/:id', timeSlotController.deleteTimeSlot);

export default router;