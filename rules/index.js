/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-10 13:49:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const path = require('path');


/**
 *****************************************
 * 创建加载规则
 *****************************************
 */
module.exports = function rules(options = {}) {
    return [
        {
            test: /\.scss$/,
            loader: path.resolve(__dirname, './scssLoader.js'),
            options
        },
        {
            test: path.resolve(__dirname, '../index.js'),
            loader: path.resolve(__dirname, './styleLoader.js'),
            options
        }
    ];
};
