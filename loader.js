
/**
 * 初始化项目根目录
 * @type {string}
 */
const ROOT_PATH = __dirname;
// 将项目绝对路径存入全局变量中
global.root_path = ROOT_PATH;

module.exports = {

    saveGlobal: (key, value) => {
        if (key && value ) global[key] = value;
    }

}



