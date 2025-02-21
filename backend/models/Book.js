// models/book.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the sequelize instance

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Title is required
  },
  userId: {
    type: DataTypes.UUID, // The ID of the user who owns the book
    allowNull: false,     // userId is required
    references: {
      model: "Users",      // Reference the "User" model
      key: "id",           // Reference the "id" field in the "Users" table
    },
  },
});

module.exports = Book;
