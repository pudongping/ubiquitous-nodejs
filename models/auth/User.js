const helper = require(global.root_path + '/lib/helper');
const db = require(helper.fileWithAbsPath('bootstrap', 'db'));

/**
 * 用户表模型
 */

module.exports = db.defineModel('users', {
    name: db.STRING(255),
    email: {
        type: db.STRING(60),
        unique: true
    },
    avatar: db.STRING(255),
    gender: {
        type: db.BOOLEAN,
        allowNull: true
    },
    password: db.STRING(255),
});
