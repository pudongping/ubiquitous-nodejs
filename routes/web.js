// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const helper = require(global.root_path + '/lib/helper');

const homeController = require(helper.fileWithAbsPath('controllers', 'home_controller'));

router.get('/', homeController.home);  // 默认首页
router.get('/home/:name', homeController.home);  // 首页
router.get('/hello', homeController.hello);  // hello 页面


module.exports = router;
