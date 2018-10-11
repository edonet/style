/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 15:32:32
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
 * 对象文件是否变更
 *****************************************
 */
module.exports = function update(file, content) {
    return new Promise(resolve => {
        fs.readFile(file, 'utf-8', (err, code) => {

            // 判断是否需要更新
            if (err || code !== content) {
                return fs.writeFile(file, content, () => resolve(true));
            }

            // 无更新
            resolve(false);
        });
    });
};
