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
const
    path = require('path'),
    resolveFile = require('./resolve'),
    build = path.resolve(__dirname, '../script/build.js');


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = async function loader() {
    let callback = this.async(),
        code = '';

    // 获取配置
    try {
        let pkg = await resolveFile(build),
            style = await pkg.default;

        // 生成样式
        if (style) {
            style.dependencies.forEach(file => this.addDependency(file));
            code = JSON.stringify(style.settings);
        }
    } catch (error) {
        return callback(error);
    }

    // 返回空
    callback(null, code);
};

