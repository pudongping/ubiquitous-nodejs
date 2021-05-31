const helper = require(global.root_path + '/lib/helper');
const ErrorCode = require(helper.fileWithAbsPath('constants', 'ErrorCode'));

/**
 * 自定义异常类
 */

module.exports =  class ApiError extends Error {

    constructor(code, message) {
        super();
        // 未定义错误信息，就默认 500 服务器内部错误
        this.code = code || ErrorCode.Code.ERR_HTTP_INTERNAL_SERVER_ERROR;
        this.message = message || ErrorCode.getErrMsg(code);
    }

}
