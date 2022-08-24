import express from "express";
import * as barberController from "../controllers/barber.js";
import * as userController from "../controllers/user.js";
import * as serviceController from "../controllers/service.js";
import * as bookingController from "../controllers/booking.js";
const router = express.Router();

router.get('/barber', barberController.getBarbers);
router.post('/barber', barberController.postBarber);
router.delete('/barber/:id', barberController.deleteBarber);

router.get('/user', userController.getUsers);
router.post('/user', userController.postUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/service', serviceController.getServices);
router.post('/service', serviceController.postService);
router.delete('/service/:id', serviceController.deleteService);

router.get('/booking', bookingController.getAllBookings);
router.post('/booking', bookingController.postBooking);
router.delete('/booking/:id', bookingController.deleteBooking);

export default router;