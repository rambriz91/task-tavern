const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserQuest extends Model {}

UserQuest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    quest_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quest',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_quest',
  },
);

module.exports = UserQuest;
