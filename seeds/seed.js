const sequelize = require('../config/connection');
const { User, Quest, Badge, UserQuest } = require('../models');

const userData = require('./userData.json');
const questPostData = require('./questPostData.json');
const badgeData = require('./badgeData.json');
const userQuestData = require('./userQuestData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const quests = await Quest.bulkCreate(questPostData);

  const badges = await Badge.bulkCreate(badgeData);

  const userQuests = await UserQuest.bulkCreate(userQuestData);

  process.exit(0);
};

seedDatabase();
