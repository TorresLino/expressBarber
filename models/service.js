import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import Booking from "./booking.js";

const Service = sequelize.define(
    'Service',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },  
        price:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        timeSlots:{
            type: DataTypes.INTEGER,
            allowNull: false
        }  
    }
);

Service.hasMany(Booking, { foreignKey: 'serviceID' });
Booking.belongsTo(Service, { foreignKey: 'serviceID' });

export default Service;