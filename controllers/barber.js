import Barber from "../models/barber.js";

export const getBarbers = async (req, res, next) => {
    const barbers = await Barber.findAll();
    res.status(200).json(barbers);
};

export const postBarber = async (req, res, next) => {
    if ( req.body.displayName != null ){
        const name = req.body.displayName;
        const createdBarber = await Barber.create({
            displayName: name
        });
        res.status(200).json(JSON.stringify(createdBarber));
    }
    else
        res.status(500).send("Invalid inputs");
};

export const deleteBarber = async (req, res, next) => {
    const barber = await Barber.findByPk(req.params.id);
    if (barber != null) {
        Barber.destroy( { where: { id: barber.id } } );
        res.status(200).send("Barber deleted, id: " + barber.id);
    }
    else{
        res.status(500).send("Barber not found");
    }
}