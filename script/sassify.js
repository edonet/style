/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-11 11:51:57
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
 * 生成【sass】配置
 *****************************************
 */
module.exports = async function sassify(file, data) {
    let code = '';

    // 生成代码
    Object.keys(data).forEach(
        name => code += `$${ name }: ${ data[name] };\n`
    );

    // 写入文件
    return await new Promise((resolve, reject) => {
        fs.writeFile(file, code, err => {

            // 处理错误
            if (err) {
                return reject(err);
            }

            // 返回结果
            resolve({ file, code, data });
        });
    });
};
