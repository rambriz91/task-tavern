const sequelize = require('../config/connection');
const { User, Quest, Badge } = require('../models');

const userData = require('./userData.json');
const questPostData = require('./questPostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
