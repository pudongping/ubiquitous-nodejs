/**
 * 处理静态文件的 middleware
 */
const path = require('path');
const mime = require('mime');
// mz 提供的 API 和 Node.js 的 fs 模块完全相同，但 fs 模块使用回调，
// 而 mz 封装了 fs 对应的函数，并改为 Promise。
// 这样，我们就可以非常简单的用 await 调用 mz 的函数，而不需要任何回调。
const fs = require('mz/fs');

/**
 * 处理静态资源
 *
 * @param url 类似 '/static/'
 * @param dir 类似 __dirname + '/static'
 * @returns {function(*, *): Promise<void>}
 */
function handleStaticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;  // 类似于：'/static/js/vue.min.js'
        // 判断是否以指定的 url 开头
        if (rpath.startsWith(url)) {
            let realPath = rpath.substring(url.length);  // 类似于： 'js/vue.min.js'
            // 获取静态文件的绝对路径
            let fp = path.join(dir, realPath);
            // 判断文件是否存在
            if (await fs.exists(fp)) {
                // 查找文件的 mime
                ctx.response.type = mime.getType(fp);
                // 将读取到的文件内容赋值给 http response body
                ctx.response.body = await fs.readFile(fp);
            } else {
                // 文件不存在
                ctx.response.status = 404;
            }
        } else {
            // 如果不是指定前缀的 url，那么继续处理下一个 middleware
            await next();
        }
    };
}

module.exports = handleStaticFiles;
