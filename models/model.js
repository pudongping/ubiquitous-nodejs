/**
 * scan all models defined in models
 */

const helper = require(global.root_path + '/lib/helper');
const db = require(helper.fileWithAbsPath('bootstrap', 'db'));

let modelPath = helper.fileWithAbsPath('models');

let files = helper.readFileList(modelPath);  // models 目录下所有的文件

module.exports = {};

files.filter((f) => {
    // 过滤掉不是 model.js 文件和不是以 .js 为后缀的文件
    return !f.endsWith('model.js') && f.endsWith('.js');
}).forEach((f) => {
    let fileName = f.split('/').pop();  // 取出文件名
    let name = fileName.substring(0, fileName.length - 3);  // 文件名去除 .js 后缀
    module.exports[name] = require(f);
});

module.exports.sync = () => {
    db.sync();
};
