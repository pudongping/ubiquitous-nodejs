const helper = require(global.root_path + '/lib/helper');
const db = require(helper.fileWithAbsPath('bootstrap', 'db'));

/**
 * 站点表模型
 */

module.exports = db.defineModel('web_sites', {
    title: db.STRING(255),
    keywords: db.STRING(255),
    description: db.TEXT,
});
