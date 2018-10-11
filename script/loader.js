/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 13:31:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const build = require('build');


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = function loader() {
    let callback = this.async();

    // 编译文件
    build().then(style => {
        style.dependencies.forEach(file => this.addDependency(file));
        callback(null, `module.exports=${ JSON.stringify(style.settings) }`);
    }).catch(callback);
};
