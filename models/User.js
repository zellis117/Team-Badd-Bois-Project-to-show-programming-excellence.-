const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(passwordAttempt) {
    return bcrypt.compareSync(passwordAttempt, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 14);
        return userData;
      },

      beforeUpdate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 14);
        return userData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
