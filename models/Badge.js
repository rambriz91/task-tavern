const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Badge extends Model {}

Badge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    badge_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 50],
      },
    },
    badge_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 200],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'badge',
  },
);

module.exports = Badge;
