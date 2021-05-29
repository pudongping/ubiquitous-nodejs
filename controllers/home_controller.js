/**
 * 首页控制器
 */

// 首页
module.exports.home = async (ctx, next) => {
    ctx.render('home.html', {
        name: ctx.query.name || 'Alex'
    });
}

module.exports.hello = async (ctx, next) => {
    ctx.render('home/hello.html');
}
