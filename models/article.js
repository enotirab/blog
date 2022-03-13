'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Article.belongsTo(models.User, {
        as: 'author',
       foreignKey: 'author_id'
      });

      Article.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'article_id',
        order: [models.Comment, 'replied_on', 'desc']
      });

    }
  };
  Article.init({
    published_on: DataTypes.DATE,
    title: DataTypes.STRING,
    body: DataTypes.BLOB,
    author_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    hook_text: DataTypes.STRING,
    friendlyPublishedDate: {
      type: DataTypes.VIRTUAL,
      get(){

        return moment(this.published_on).format('MMMM Do, YYYY');
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};