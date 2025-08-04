const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const User = require("../models/User");
    await sequelize.sync();

    // Create default admin user
    const bcrypt = require("bcrypt");
    const admin = await User.findOne({ where: { username: "admin" } });
    if (!admin) {
      const hashed = await bcrypt.hash("admin", 10);
      await User.create({ username: "admin", password: hashed });
      console.log("Default admin user created.");
    }
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { sequelize, initDB };