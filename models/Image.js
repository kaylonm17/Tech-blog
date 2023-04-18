const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    file_src: {
      type: DataTypes.STRING,
    },

    daily_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'daily',
        key: 'id',
      },
    },

    tech_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tech',
        key: 'id',
      },
    },


  },
  

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "image",
  }
);

module.exports = Image;
