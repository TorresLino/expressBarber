import Booking from "../models/booking.js";
import { Op } from "sequelize";

export const getAllBookings = async (req, res, next) => {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
};

export const getBookingTimesForDate = async (req, res, next) => {
    const bookings = await Booking.findAll({
        attributes: ['timeSlotID', 'barberID'],
        where: {date: req.params.date}})
    res.status(200).json(bookings);
};

export const getFutureBookingsForUser = async (req, res, next) => {
    const bookings = await Booking.findAll({        
        attributes: ['id', 'date', 'barberID', 'serviceID', 'timeSlotID'],
        where: {
            'date': { [Op.gte]: req.params.date },
            'userID': req.params.id
        },
        order: [['date']]
    })
    res.status(200).json(bookings);
}

export const postBooking = async (req, res, next) => {
    try{
        const userID = parseInt(req.body.userID);
        const barberID = parseInt(req.body.barberID);
        const serviceID = parseInt(req.body.serviceID);
        const date = req.body.date;
        const timeSlotID = parseInt(req.body.timeSlotID);
        if ( userID != null && barberID != null && serviceID != null && date != null && timeSlotID != null ){
            const createdBooking = await Booking.create({
                barberID: barberID,
                userID: userID,
                serviceID: serviceID,
                date: date,
                timeSlotID: timeSlotID
            });
            res.status(200).json(JSON.stringify(createdBooking));
        }
        else
            res.status(500).send("Invalid inputs");
    }
    catch{
        res.status(500).send("Error inserting value");
    }
};

export const deleteBooking = async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.id);
    if (booking != null) {
        await Booking.destroy( { where: { id: booking.id } } );
        res.status(200).send("Booking deleted, id: " + booking.id);
    }
    else{
        res.status(500).send("Booking not found");
    }
}