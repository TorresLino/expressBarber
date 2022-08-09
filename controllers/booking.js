import Booking from "../models/booking.js";

export const getAllBookings = async (req, res, next) => {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
};

export const postBooking = async (req, res, next) => {
    const userID = parseInt(req.body.userID);
    const barberID = parseInt(req.body.barberID);
    const serviceID = parseInt(req.body.serviceID);
    const dateTime = new Date(req.body.dateTime);
    console.log(userID);
    console.log(barberID);
    console.log(serviceID);
    console.log(dateTime);
    if ( userID != null && barberID != null && serviceID != null && dateTime.toString() != 'Invalid Date' ){
        const createdBooking = await Booking.create({
            barberID: barberID,
            userID: userID,
            serviceID: serviceID,
            dateTime: dateTime
        });
        res.status(200).json(JSON.stringify(createdBooking));
    }
    else
        res.status(500).send("Invalid inputs");
};

export const deleteBooking = async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.id);
    if (booking != null) {
        Booking.destroy( { where: { id: booking.id } } );
        res.status(200).send("Booking deleted, id: " + booking.id);
    }
    else{
        res.status(500).send("Booking not found");
    }
}