const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

/* define "Comment" table:
  [id, user_id, trip_id, comment_text]
*/
Comment.init(
  {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'user',
            key: 'id'
         }
      },
      trip_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'trip',
            key: 'id'
         }
      },
      comment_text: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1]
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
   }
);

module.exports = Comment;