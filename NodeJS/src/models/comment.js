'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: "userId", targetKey: "id", as: "commentUser"})
      Comment.belongsTo(models.Comment, {foreignKey: "parentId", targetKey: "id", as: "commentOfParent"})
      Comment.belongsTo(models.HandBook, {foreignKey: "handbookId", targetKey: "id", as: "commentOfHandbook"})
    }
  };
  Comment.init({
    userId: DataTypes.STRING,
    handbookId: DataTypes.INTEGER,
    value: DataTypes.TEXT,
    parentId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};