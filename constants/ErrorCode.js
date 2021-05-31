const Code = {
    /**
     * http 正常时,返回码
     */
    SUCC_HTTP_OK: 200,  // 操作成功

    /**
     * http 相关错误
     */
    ERR_HTTP_BAD_REQUEST: 400,  // 请求异常
    ERR_HTTP_UNAUTHORIZED: 401,  // 登录已过期，请重新登录
    ERR_HTTP_FORBIDDEN: 403,  // 无权访问该地址
    ERR_HTTP_NOT_FOUND: 404,  // 请求地址不存在
    ERR_HTTP_METHOD_NOT_ALLOWED: 405,  // 不允许请求该方法
    ERR_HTTP_UNSUPPORTED_MEDIA_TYPE: 415,  // 请求体类型错误
    ERR_HTTP_UNPROCESSABLE_ENTITY: 422,  // 参数校验错误
    ERR_HTTP_TOO_MANY_REQUESTS: 429,  // 请求频次达到上限
    ERR_HTTP_INTERNAL_SERVER_ERROR: 500,  // 服务器内部错误

    /**
     * 10000 系统级别错误
     */
    ERR_QUERY: 10001,  // 数据库操作失败
    ERR_DB: 10002,  // 数据库连接失败
    ERR_PARAMS: 10003,  // 参数不符合预期
    ERR_MODEL: 10004,  // 数据不存在
    ERR_FILE_UP_LOAD: 10005,  // 文件上传出错
    ERR_PARAMS_MISS: 10006,  // 参数不存在

};


const Msg = {};
Msg[Code.SUCC_HTTP_OK] = '操作成功';

Msg[Code.ERR_HTTP_BAD_REQUEST] = '请求异常';
Msg[Code.ERR_HTTP_UNAUTHORIZED] = '登录已过期，请重新登录';
Msg[Code.ERR_HTTP_FORBIDDEN] = '无权访问该地址';
Msg[Code.ERR_HTTP_NOT_FOUND] = '请求地址不存在';
Msg[Code.ERR_HTTP_METHOD_NOT_ALLOWED] = '不允许请求该方法';
Msg[Code.ERR_HTTP_UNSUPPORTED_MEDIA_TYPE] = '请求体类型错误';
Msg[Code.ERR_HTTP_UNPROCESSABLE_ENTITY] = '参数校验错误';
Msg[Code.ERR_HTTP_TOO_MANY_REQUESTS] = '请求频次达到上限';
Msg[Code.ERR_HTTP_INTERNAL_SERVER_ERROR] = '服务器内部错误';

Msg[Code.ERR_QUERY] = '数据库操作失败';
Msg[Code.ERR_DB] = '数据库连接失败';
Msg[Code.ERR_PARAMS] = '参数不符合预期';
Msg[Code.ERR_MODEL] = '数据不存在';
Msg[Code.ERR_FILE_UP_LOAD] = '文件上传出错';
Msg[Code.ERR_PARAMS_MISS] = '参数不存在';


/**
 * 获取提示码对应的提示信息
 * @param code  提示码
 * @returns {string}  提示信息
 */
function getErrMsg(code) {
    let msg = '提示信息未定义';
    if (Msg[code]) msg = Msg[code];
    return msg;
}

module.exports = {
    Code,
    Msg,
    getErrMsg: getErrMsg
}
