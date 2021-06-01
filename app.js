const loader = require('./loader');  // 初始化常量信息
const bootstrap = require('./bootstrap/boot');  // 项目初始化启动流程

const config = bootstrap.config();  // 自动根据环境变量获取配置信息
// 将读取的所有配置信息存入全局变量中
loader.saveGlobal('config', config);




bootstrap.start();  // 项目启动

console.log(`The development environment is ====> ${process.env.NODE_ENV} `);

// 监听端口
bootstrap.app.listen(global.config.app.web_port);
console.log(`Server is running at ${global.config.app.url}:${global.config.app.web_port}`);
