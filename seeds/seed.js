const sequelize = require('../config/connection');
const { User, Quest, Badge } = require('../models');

const userData = require('./userData.json');
const questPostData = require('./questPostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const Quest of questPostData) {
  //   await Quest.create({
  //     ...Quest,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
