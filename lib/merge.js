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
    fs = require('fs'),
    path = require('path'),
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
            settings = { ...settings, ...style.settings };
            dependencies.push(style.file);
        }
    }

    // 返回结果
    return { settings, dependencies };
};


/**
 *****************************************
 * 解析模块
 *****************************************
 */
function resolveFile(file) {
    return new Promise(resolve => {
        fs.stat(file, err => {

            // 处理错误
            if (err) {
                return resolve(null);
            }

            // 清除缓存
            delete require.cache[file];

            // 加载数据
            resolve({ file, settings: require(file) });
        });
    });
}
