/**
 * 助手函数
 */

const path = require('path');

module.exports = {

    /**
     * 拼接绝对路径
     * @param paths  目录或者文件名
     * @returns {string}  目录或者文件名的绝对路径
     */
    fileWithAbsPath: (...paths) => {
        if (!arguments.length) return global.root_path;
        paths.unshift(global.root_path);  // 将项目根目录拼接进去
        return path.join(...paths);
    },


}
