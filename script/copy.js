/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 12:24:19
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
    regexp = /\$\{(.*?)\}/g;


/**
 *****************************************
 * 复制文件
 *****************************************
 */
module.exports = function copy(src, dist, data) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, 'utf-8', (err, code) => {

            // 处理错误
            if (err) {
                return reject(err);
            }

            // 替换变量
            if (data) {
                code = code.replace(regexp, (str, find) => {
                    let [name, value = ''] = find.split(':');

                    // 替换文本
                    return data[name.trim()] || value.trim();
                });
            }

            // 写入文件
            fs.writeFile(
                dist, code, err => err ? reject(err) : resolve(code)
            );
        });
    });
};
