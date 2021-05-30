/**
 * 统一 Model 的定义
 */

const Sequelize = require('sequelize');

console.log('init sequelize...');

const config = global.config;  // 读取当前环境的配置信息

let dialect = config.app.dialect,  // 所需要选择的数据库
    databaseConnects = config[dialect] || config.mysql;  // 当前数据库连接信息

// 数据库连接
const sequelize = new Sequelize(databaseConnects.database, databaseConnects.username, databaseConnects.password, {
    host: databaseConnects.host,
    port: databaseConnects.port,
    dialect: dialect,
    pool: {  // 连接池设置
        max: 5,  // 最大连接数
        min: 0,  // 最小连接数
        idle: 10000
    }
});

// 封装定义模型的方法
function defineModel(name, attributes) {
    let attrs = {};
    // 遍历所有的字段及字段属性
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;  // 默认所有的字段都不为 null
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    // 主键相关设置
    attrs.id = {
        type: Sequelize.BIGINT(),
        primaryKey: true,  // 主键
        autoIncrement: true,  // 自动递增
        comment: "自增id"
    };
    // 创建时间
    attrs.created_at = {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    };
    // 更新时间
    attrs.updated_at = {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    };

    console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, (k, v) => {
        if (k === 'type') {
            for (let key in Sequelize) {
                if (key === 'ABSTRACT' || key === 'NUMBER') {
                    continue;
                }
                let dbType = Sequelize[key];
                if (typeof dbType === 'function') {
                    if (v instanceof dbType) {
                        if (v._length) {
                            return `${dbType.key}(${v._length})`;
                        }
                        return dbType.key;
                    }
                    if (v === dbType) {
                        return dbType.key;
                    }
                }
            }
        }
        return v;
    }, '  '));

    // 第一个参数 name 是表名
    // 第二个参数 attrs 指定列名和数据类型
    // 第三个参数是额外的配置
    return sequelize.define(name, attrs, {
        tableName: name,
        // freezeTableName: true,  // 使用自定义表名
        timestamps: false,  // 去掉默认的添加时间和更新时间
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {  // 是否是新纪录
                    console.log('will create entity...' + obj);
                    obj.created_at = now;
                    obj.updated_at = now;
                } else {
                    console.log('will update entity...');
                    obj.updated_at = now;
                }
            }
        }
    });
}

// 定义的模型字段只允许出现如下几种类型
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

let exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });  // 先删除后同步
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

module.exports = exp;
