import User from "../models/user.js";

export const getUsers = async (req, res, next) => {
    const users = await User.findAll();
    res.status(200).json(users);
};

export const postUser = async (req, res, next) => {
    if ( req.body.firstName != null && req.body.email != null ){
        const firstName = req.body.firstName;
        const email = req.body.email;
        const createdUser = await User.create({
            firstName: firstName,
            email: email
        });
        res.status(200).json(JSON.stringify(createdUser));
    }
    else
        res.status(500).send("Invalid inputs");
};

export const deleteUser = async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (user != null) {
        User.destroy( { where: { id: user.id } } );
        res.status(200).send("User deleted, id: " + user.id);
    }
    else{
        res.status(500).send("User not found");
    }
}