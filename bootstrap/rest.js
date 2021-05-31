/**
 * 为 api url 增加 rest 方法的 middleware
 */

const helper = require(global.root_path + '/lib/helper');
const ErrorCode = require(helper.fileWithAbsPath('constants', 'ErrorCode'));

module.exports = {

    restify: (pathPrefix) => {
        // restful api 前缀，默认为 /api/
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            // 如果是 restful api 前缀
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定 rest() 方法
                ctx.rest = (data) => {
                    ctx.response.status = ErrorCode.Code.SUCC_HTTP_OK;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: ErrorCode.Code.SUCC_HTTP_OK,
                        message: ErrorCode.getErrMsg(ErrorCode.Code.SUCC_HTTP_OK),
                        data: data || {}
                    };
                }
                try {
                    await next();
                } catch (e) {
                    // 返回错误
                    // 不管程序是否发生错误，都将返回 200 http code，如果有错误信息，将通过 data 中的 code 不为 200 来做判断
                    ctx.response.status = ErrorCode.Code.SUCC_HTTP_OK;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || ErrorCode.Code.ERR_HTTP_INTERNAL_SERVER_ERROR,
                        message: e.message || ErrorCode.getErrMsg(ErrorCode.Code.ERR_HTTP_INTERNAL_SERVER_ERROR)
                    };
                }
            } else {
                await next();
            }
        };
    }

};
