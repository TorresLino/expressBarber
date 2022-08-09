import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define(
    'Booking',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        dateTime:{
            type: DataTypes.DATE,
            allowNull: false
        }
    }
);

export default Booking;