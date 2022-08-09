import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import Booking from "./booking.js";

const Barber = sequelize.define(
    'Barber',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        displayName:{
            type: DataTypes.STRING,
            allowNull: false
        },        
    }
);

Barber.hasMany(Booking, { foreignKey: 'barberID' });
Booking.belongsTo(Barber, { foreignKey: 'barberID' });

export default Barber;