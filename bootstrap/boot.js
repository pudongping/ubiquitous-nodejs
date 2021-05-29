const Koa = require('koa');
// 引入 koa-bodyparser 来解析原始 request 中的 body
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const helper = require('../lib/helper');
const templating = require('./templating');

// 创建一个 Koa 对象表示 web app 本身
const app = new Koa();

/**
 * 记录 url
 * @private
 */
function _routeLog() {
    // 对于任何请求，app 将调用该异步函数处理请求：
    // 参数 ctx 是由 koa 传入的封装了 request 和 response 的变量，我们可以通过它访问 request 和 response
    app.use(async (ctx, next) => {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}`); // 打印 URL
        await next(); // 调用下一个 middleware
    });
}

/**
 * 记录页面执行时间
 * @private
 */
function _runtime() {
    app.use(async (ctx, next) => {
        const start = new Date().getTime(); // 当前时间
        await next(); // 调用下一个 middleware
        const execTime = new Date().getTime() - start; // 耗费时间
        ctx.response.set('X-Response-Time', `${execTime}ms`);
        console.log(`Time: ${execTime}ms`); // 打印执行消耗时间
    });
}

/**
 * 处理静态文件
 * @private
 */
function _staticFiles() {
    // 生产环境中，静态文件是由 nginx 处理的，因此就不需要 Koa 处理静态资源
    if ('production' !== process.env.NODE_ENV) {
        let staticFiles = require('./static-files');
        app.use(staticFiles('/static/', helper.fileWithAbsPath('static')));
    }
}

/**
 * 解析 post 请求
 * koa-bodyparser 必须在 router 之前被注册到 app 对象上
 * @private
 */
function _parseRequestBody() {
    app.use(bodyParser());
}

/**
 * 给 ctx 加上 render() 函数来使用 Nunjucks
 * @private
 */
function _templating() {
    const isProduction = 'production' === process.env.NODE_ENV;
    app.use(templating(helper.fileWithAbsPath('views'), {
        noCache: !isProduction,  // 如果是 production 环境，就使用缓存
        watch: !isProduction
    }));
}

/**
 * 自动注册路由
 * @private
 */
function _autoloadRoute() {
    // 这里可以用 sync 是因为启动时只运行一次，不存在性能问题:
    fs.readdirSync(helper.fileWithAbsPath('routes')).filter((routeFile) => {
        return routeFile.endsWith('.js');
    }).forEach((routeFile) => {
        console.log(`autoload register route file is ====> ${routeFile}`);
        ~routeFile.indexOf('.js') && app.use(require(helper.fileWithAbsPath('routes', routeFile)).routes());
    })
}

/**
 * 自动加载 config 目录下所有的配置信息
 * @param dir  配置文件目录名称
 * @returns {{}}
 */
function loadConfigData(dir) {
    let configDir = dir || 'config';
    let config = {};
    fs.readdirSync(helper.fileWithAbsPath(configDir)).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`load config: ${f}`);
        let configName = f.replace('.js', '');  // 获取配置文件的名称
        let mapping = require(helper.fileWithAbsPath(configDir, f));  // 引入配置文件中的配置信息
        config[configName] = mapping;  // 以配置文件名称作为 key，配置名称对应的配置作为 value
    });
    return config;  // 读取到的所有配置信息
}

/**
 * 根据当前项目环境取出对应的配置文件信息
 * @returns {*}
 */
function configForEnv() {
    let allConfig = loadConfigData();
    let env = 'development';
    if (process.env.NODE_ENV) env = process.env.NODE_ENV;
    return allConfig[env];
}

/**
 * 通过调用 middleware 执行流程
 */
function start() {
    _routeLog();  // 1、记录 url
    _runtime();  // 2、记录页面执行时间
    _staticFiles();  // 3、处理静态文件
    _parseRequestBody();  // 4、解析 post 请求
    _templating();  // 5、给 ctx 加上 render() 函数来使用 Nunjucks
    _autoloadRoute();  // 6、自动注册路由
}

module.exports = {
    start: start,  // 启动程序
    app: app,  // koa 对象
    config: configForEnv,  // 当前环境配置信息
}
