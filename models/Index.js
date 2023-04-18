const User = require('./User');
const Tech = require('./Tech');
const Comment = require('./Comment');
const Daily = require('./Daily');
const Image = require('./Image')

Tech.hasMany(Daily, {
   foreignKey: 'tech_id'
 });

Daily.belongsTo(Tech, {
   foreignKey: 'tech_id'
});

Tech.belongsTo(User,{
   foreignKey: 'user_id'
});

Comment.belongsTo(User,{
   foreignKey: 'user_id'
});

Comment.belongsTo(Tech, {
   foreignKey: 'tech_id'
 });
 
User.hasMany(Tech,{
   foreignKey: 'user_id'
});

User.hasMany(Comment, {
   foreignKey: 'user_id'
});
 
Tech.hasMany(Comment, {
   foreignKey: 'tech_id'
});

Image.belongsTo(Daily, {
   foreignKey: 'image_id'
});

Image.belongsTo(Tech, {
   foreignKey: 'image_id'
});
 
module.exports = { User, Tech, Comment, Daily, Image };
