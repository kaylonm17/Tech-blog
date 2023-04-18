const sequelize = require('../config/connection');
const seedTechs = require('./tech_data');
const seedUsers = require('./user_data');
const seedComments = require('./comment_data');
const seedDaily = require('./daily_data');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();    // call ./user_data.js
  await seedTechs();    // call ./tech_data.js
  await seedComments(); // call ./comment_data.js
  await seedDaily();

  process.exit(0);
};

seedAll();
