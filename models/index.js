const User = require('./User');
const Badge = require('./Badge');
const Quest = require('./Quest');

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

module.exports = { User, Badge, Quest };
