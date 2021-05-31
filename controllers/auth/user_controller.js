/**
 * 用户相关
 */

const helper = require(global.root_path + '/lib/helper');
const userService = require(helper.fileWithAbsPath('services', 'auth', 'user_service'));

// 用户列表
// curl 'http://127.0.0.1:9500/api/users'
module.exports.getList = async (ctx, next) => {
    let data = await userService.getList();
    ctx.rest(data);
}

// 创建新用户
// curl -H 'Content-Type: application/json' -X POST -d '{"name":"alex","email":"123456@admin.com","avatar":"https://pudongping.com/uploads/images/avatars/201912/07/1_1575651320_G3hUEZnQgE.png","gender":1,"password":123456}' http://localhost:9500/api/users
module.exports.store = async (ctx, next) => {
    let data = await userService.store(ctx);
    ctx.rest(data);
}

// 更新用户
// curl -H 'Content-Type: application/json' -X PUT -d '{"name":"alex","email":"121113@admin.com","avatar":"https://pudongping.com/uploads/images/avatars/201912/07/1_1575651320_G3hUEZnQgE.png","gender":0,"password":123456789}' http://localhost:9500/api/users/2
module.exports.update = async (ctx, next) => {
    let data = await userService.update(ctx);
    ctx.rest(data);
}

// 删除用户
// curl -H 'Content-Type: application/json' -X DELETE http://localhost:9500/api/users/1
module.exports.destroy = async (ctx, next) => {
    let data = await userService.destroy(ctx);
    ctx.rest(data);
}
