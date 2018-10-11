/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 14:36:20
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    path = require('path'),
    resolveFile = require('./resolve'),
    usedir = dir => (...args) => path.resolve(dir, ...args),
    cwd = usedir(process.cwd());


/**
 *****************************************
 * 创建样式配置
 *****************************************
 */
module.exports = async function merge(settings, ...args) {
    let dependencies = [];

    // 加载样式
    for (let name of args) {
        let style = await resolveFile(cwd(name));

        // 合并配置
        if (style) {
            settings = { ...settings, ...style.default };
            dependencies.push(style.file);
        }
    }

    // 返回结果
    return { settings, dependencies };
};
