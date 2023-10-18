"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MyMovie.belongsTo(models.User);
      // define association here
    }
  }
  MyMovie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is Required" },
          notNull: { msg: "Title is Required" },
        },
      },
      release_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Release Date is Required" },
          notNull: { msg: "Release Date is Required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId is Required" },
          notNull: { msg: "UserId is Required" },
        },
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "movieId is Required" },
          notNull: { msg: "movieId is Required" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "ImageUrl is Required" },
          notNull: { msg: "ImageUrl is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "MyMovie",
    }
  );
  return MyMovie;
};
