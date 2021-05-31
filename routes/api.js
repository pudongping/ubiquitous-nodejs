const router = require('koa-router')();
const helper = require(global.root_path + '/lib/helper');

const userController = require(helper.fileWithAbsPath('controllers', 'auth', 'user_controller'));

router.get('/api/users', userController.getList);  // 用户列表
router.post('/api/users', userController.store);  // 添加用户
router.put('/api/users/:id', userController.update);  // 更新用户
router.delete('/api/users/:id', userController.destroy);  // 删除用户

module.exports = router;
