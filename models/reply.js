'use strict';
const moment = require('moment');
const {
    Model,
    Op,
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Reply extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Reply.init({
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
        modelName: 'Reply',
        tableName: 'Comments',
        defaultScope: {
            where: {
                parent_comment_id: {
                    [Op.ne]: null
                }
            }
        }
    });
    return Reply;
};