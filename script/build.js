/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 11:19:17
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
    sassify = require('./sassify'),
    lessify = require('./lessify'),
    copy = require('./copy'),
    usedir = dir => (...args) => path.resolve(dir, ...args),
    cwd = usedir(process.cwd()),
    dir = usedir(__dirname);


/**
 *****************************************
 * 启动编译
 *****************************************
 */
module.exports = run().catch(console.error);


/**
 *****************************************
 * 定义编译脚本
 *****************************************
 */
async function run() {
    let style = await createStyle(
            'style.json',
            'style.js',
            'style.config.json',
            'style.config.js',
            'style.conf.json',
            'style.conf.js'
        );

    // 生成配置文件
    sassify(dir('../scss/config.scss'), style.settings);
    lessify(dir('../less/config.less'), style.settings);
    copy(dir('../public/bd.svgx'), dir('../public/bd.svg'), style.settings);

    // 返回结果
    return style;
}


/**
 *****************************************
 * 创建样式配置
 *****************************************
 */
async function createStyle(...args) {
    let settings = require('../settings.json'),
        dependencies = [];

    // 加载样式
    for (let name of args) {
        let style = await resolveStyle(cwd(name));

        // 合并配置
        if (style) {
            settings = { ...settings, ...style.settings };
            dependencies.push(style.file);
        }
    }

    // 返回结果
    return { settings, dependencies };
}


/**
 *****************************************
 * 解析模块
 *****************************************
 */
function resolveStyle(file) {
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
