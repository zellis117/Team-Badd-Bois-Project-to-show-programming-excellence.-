const sequelize = require('../config/connection');
const State = require('../models/State');
const stateData = require('./state-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await State.bulkCreate(stateData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();