const User = require('./User');
const Badge = require('./Badge');
const Quest = require('./Quest');
const UserQuest = require('./UserQuest');

Badge.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Badge, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Quest.belongsTo(User, {
  foreignKey: 'poster_id',
});
User.hasMany(Quest, {
  foreignKey: 'poster_id',
});
// Quest.belongsToMany(User, {
//   through: {
//     model: UserQuest,
//     unique: false,
//     foreignKey: 'quest_id',
//   },
// });

// User.belongsToMany(Quest, {
//   through: {
//     model: UserQuest,
//     unique: false,
//     foreignKey: 'user_id',
//   },
// });

module.exports = { User, Badge, Quest, UserQuest };
