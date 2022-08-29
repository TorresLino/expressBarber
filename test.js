import sequelize from "./config/db.js";

await sequelize.sync({ alter: false });

