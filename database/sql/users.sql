CREATE TABLE `ubiquitous`.`users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `email` varchar(60) NOT NULL DEFAULT '' COMMENT '邮箱账号',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像地址',
  `gender` tinyint UNSIGNED NULL DEFAULT 0 COMMENT '性别',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
  `created_at` timestamp(0) NULL COMMENT '创建时间',
  `updated_at` timestamp(0) NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) COMMENT = '用户表';

CREATE TABLE `ubiquitous`.`web_sites`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '网站title',
  `keywords` varchar(255) NULL DEFAULT '' COMMENT '网站关键字',
  `description` text NULL COMMENT '网站描述信息',
  `created_at` timestamp(0) NULL COMMENT '创建时间',
  `updated_at` timestamp(0) NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) COMMENT = '站点配置相关';
