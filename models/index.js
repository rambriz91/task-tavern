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

// User.hasMany(Quest);

module.exports = { User, Badge, Quest };
