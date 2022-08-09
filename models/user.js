import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import Booking from "./booking.js";

const User = sequelize.define(
    'User',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        }    
    }
);

User.hasMany(Booking, { foreignKey: 'userID' });
Booking.belongsTo(User, { foreignKey: 'userID' });

export default User;