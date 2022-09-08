import Service from "../models/service.js";

export const getServices = async (req, res, next) => {
    const services = await Service.findAll({order: ['timeSlots', 'name']});
    res.status(200).json(services);
};

export const getServiceByCode = async (req, res, next) => {
    const services = await Service.findAll({
        attributes: ['id', 'name', 'price', 'timeSlots'],
        where: {code: req.params.code}
    });
    
    res.status(200).json(services);
}

export const postService = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const timeSlots = parseInt(req.body.timeSlots);
    const code = req.body.code;
    if ( name != null && description != null && price != null && timeSlots != null && code != null ){
        const createdService = await Service.create({
            name: name,
            description: description,
            price: price,
            timeSlots: timeSlots,
            code: code
        });
        res.status(200).json(JSON.stringify(createdService));
    }
    else
        res.status(500).send("Invalid inputs");
};

export const deleteService = async (req, res, next) => {
    const service = await Service.findByPk(req.params.id);
    if (service != null) {
        Service.destroy( { where: { id: service.id } } );
        res.status(200).send("Service deleted, id: " + service.id);
    }
    else{
        res.status(500).send("Service not found");
    }
}