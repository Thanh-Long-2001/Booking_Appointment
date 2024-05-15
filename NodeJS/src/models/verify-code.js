'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 1->n
      VerifyCode.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userCode' }) //n-1

    }
  };
  VerifyCode.init({
    userId: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
   
  }, {
    sequelize,
    modelName: 'VerifyCode',
  });
  return VerifyCode;
};