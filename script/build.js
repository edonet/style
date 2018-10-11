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
    path = require('path'),
    merge = require('../lib/merge'),
    sassify = require('../lib/sassify'),
    lessify = require('../lib/lessify'),
    copy = require('../lib/copy'),
    defaults = require('../settings.json'),
    usedir = dir => (...args) => path.resolve(dir, ...args),
    dir = usedir(__dirname);


/**
 *****************************************
 * 定义编译脚本
 *****************************************
 */
async function run() {
    let style = await merge(
            defaults,
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
 * 启动编译
 *****************************************
 */
module.exports = run().catch(console.error);
