'use strict';
const moment = require('moment');
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
            Comment.hasMany(models.Reply, {
                as: 'replies',
                foreignKey: 'parent_comment_id',
            });
        }
    };
    Comment.init({
        body: DataTypes.BLOB,
        replied_on: DataTypes.DATE,
        author_name: DataTypes.STRING,
        article_id: DataTypes.BIGINT,
        parent_comment_id: DataTypes.BIGINT,
        friendlyReplyDate: {
            type: DataTypes.VIRTUAL,
            get() {
                let repliedOn = moment(this.replied_on);
                let now = moment();
                return moment.duration(repliedOn.diff(now)).humanize(true)
            }
        }
    }, {
        sequelize,
        modelName: 'Comment',

        defaultScope: {
            where: {
                parent_comment_id: null
            }
        }
    });
    return Comment;
};