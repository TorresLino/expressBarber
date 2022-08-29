import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import Booking from "./booking.js";

const TimeSlot = sequelize.define(
    'TimeSlot',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        time:{
            type: DataTypes.TIME,
            allowNull: false
        }
    }
);
TimeSlot.hasMany(Booking, { foreignKey: 'timeSlotID' });
Booking.belongsTo(TimeSlot, { foreignKey: 'timeSlotID' });

export default TimeSlot;