const moment = require('moment');

const helper = require(global.root_path + '/lib/helper');
const model = require(helper.fileWithAbsPath('models', 'model'));
const ErrorCode = require(helper.fileWithAbsPath('constants', 'ErrorCode'));
const ApiError = require(helper.fileWithAbsPath('lib', 'api_error'));


let User = model.User;

module.exports = {

    /**
     * 用户列表
     * @returns {Promise<*>}
     */
    async getList() {
        let user = await User.findAll({
            order: [
                ['id', 'desc'],  // 根据 id 倒序排列
            ],
            attributes: ['id', 'name', 'email', 'avatar', 'gender', 'created_at'],
        });

        return user;
    },

    /**
     * 创建新用户
     * @param ctx
     * @returns {Promise<*>}
     */
    async store(ctx) {
        let params = {
            name: ctx.request.body.name || 'alex',
            email: ctx.request.body.email || '123456@admin.com',
            avatar: ctx.request.body.avatar || '',
            gender: ctx.request.body.gender || 1,
            password: ctx.request.body.password || '123456',
        };

        let user = await User.create(params);

        console.log('created: ' + JSON.stringify(user));

        return user;
    },

    /**
     * 更新用户信息
     * @param ctx
     * @returns {Promise<*>}
     */
    async update(ctx) {
        if (!parseInt(ctx.request.params.id)) {
            throw new ApiError(ErrorCode.Code.ERR_PARAMS_MISS, 'id 不存在！');
        }

        let params = {
            name: ctx.request.body.name || 'alex',
            email: ctx.request.body.email || '123456@admin.com',
            avatar: ctx.request.body.avatar || '',
            gender: ctx.request.body.gender || 1,
            password: ctx.request.body.password || '123456',
            // updated_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        };

        // 返回的是影响行数，比如 1
        let user = await User.update(params, {
            where: {
                id: parseInt(ctx.request.params.id)
            }
        });

        console.log('updated: ' + JSON.stringify(user));

        return user;
    },

    /**
     * 删除用户
     * @param ctx
     * @returns {Promise<void>}
     */
    async destroy(ctx) {
        if (!parseInt(ctx.request.params.id)) {
            throw new ApiError(ErrorCode.Code.ERR_PARAMS_MISS, 'id 不存在！');
        }
        await User.destroy({
            where: {
                id: parseInt(ctx.request.params.id)
            }
        });
    }

};
