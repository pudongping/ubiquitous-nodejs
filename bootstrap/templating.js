/**
 * 处理模版的 middleware
 * 这个 middleware 的作用是给 ctx 对象绑定一个 render(view, model) 的方法
 */
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    let
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,  // 控制输出是否被转义
        noCache = opts.noCache || false,  // 模版文件是否开启缓存
        watch = opts.watch || false,  // 启用模版文件监听，文件一旦发生改变，重新编译
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建 Nunjucks 的 env 对象:
    let env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给 ctx 绑定 render 函数:
        ctx.render = function (view, model) {
            // 把 render 后的内容赋值给 response.body:
            // Object.assign() 会把除第一个参数外的其他参数的所有属性复制到第一个参数中。
            // 第二个参数是 ctx.state || {}，这个目的是为了能把一些公共的变量放入 ctx.state 并传给 View。
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置 Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}

module.exports = templating;
