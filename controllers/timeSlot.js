import TimeSlot from "../models/timeSlot.js";

export const getTimeSlots = async (req, res, next) => {
    const timeSlot = await TimeSlot.findAll({attributes: ['id', 'time']});
    res.status(200).json(timeSlot);
};

export const postTimeSlot = async (req, res, next) => {
    if ( req.body.time != null ){
        const time = req.body.time;
        const createdTimeSlot = await TimeSlot.create({
            time: time
        });
        res.status(200).json(JSON.stringify(createdTimeSlot));
    }
    else
        res.status(500).send("Invalid inputs");
};

export const deleteTimeSlot = async (req, res, next) => {
    const timeSlot = await TimeSlot.findByPk(req.params.id);
    if (timeSlot != null) {
        TimeSlot.destroy( { where: { id: timeSlot.id } } );
        res.status(200).send("TimeSlot deleted, id: " + timeSlot.id);
    }
    else{
        res.status(500).send("TimeSlot not found");
    }
}