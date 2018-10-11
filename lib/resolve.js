/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 15:00:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const fs = require('fs');


/**
 *****************************************
 * 解析文件
 *****************************************
 */
module.exports = function resolve(file) {
    return new Promise(resolve => {
        fs.stat(file, err => {

            // 处理错误
            if (err) {
                return resolve(null);
            }

            // 清除缓存
            delete require.cache[file];

            // 加载数据
            resolve({ file, default: require(file) });
        });
    });
};
