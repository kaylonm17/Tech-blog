const { Model, DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/connection');

class tech extends Model {}

/* define "tech" table:
  [id, title, tech_content, user_id]
*/
tech.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tech_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        starting_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ending_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        image_location: {
            type:DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        image_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'image',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'tech',
      }
);

module.exports = tech;