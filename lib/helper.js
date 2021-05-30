/**
 * 助手函数
 */

const path = require('path');
const fs = require('fs');

const helper = {

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

    /**
     * 递归读取目录下所有的文件
     * @param dir  目录名称
     * @param filesList  该目录下所有的文件数组
     * @returns {*[]}
     */
    readFileList: (dir, filesList = []) => {
        const files = fs.readdirSync(dir);  // dir 目录下所有的文件
        files.forEach((item, index) => {
            let fullPath = path.join(dir, item);
            let stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {  // 如果是目录
                helper.readFileList(path.join(dir, item), filesList);  // 递归读取文件
            } else {
                filesList.push(fullPath);
            }
        });
        return filesList;
    },


}

module.exports = helper;
