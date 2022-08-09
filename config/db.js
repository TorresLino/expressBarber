import Sequelize from "sequelize";

const sequelize = new Sequelize('barber', 'admin', '123456', {
    dialect: "sqlite",
    storage: "./database.sqlite3"
});

export default sequelize;