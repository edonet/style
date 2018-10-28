/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-27 11:22:29
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 获取浏览器前缀
 *****************************************
 */
export const vendor = (() => {
    var style = document.createElement('div').style,
        vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];

    for (let vendor of vendors) {
        if ((vendor + 'ransform') in style) {
            return vendor.slice(0, -1);
        }
    }

    return '';
})();


/**
 *****************************************
 * 补全浏览器前缀
 *****************************************
 */
export const prefix = name => {
    return vendor ? vendor + name.charAt(0).toUpperCase() + name.substr(1) : name;
};


/**
 *****************************************
 * 常用样式
 *****************************************
 */
export const prefixed = {
    transform: prefix('transform'),
    transition: prefix('transition')
};


/**
 *****************************************
 * 变化对象
 *****************************************
 */
export function transform(style, value) {
    return style[prefixed.transform] = value;
}


/**
 *****************************************
 * 绑定元素
 *****************************************
 */
export default function bind({ style = {} } = {}) {
    return {
        transform: value => transform(style, value),
        translate: (x, y, z) => (
            transform(style, `translate(${ x || 0 }px, ${ y || 0 }px) translateZ(${ z || 0 }px)`)
        ),
        scale: (value = 1, cx = 0, cy = 0) => (
            transform(style, `translate(${ cx }px, ${ cy }px) translateZ(0) scale(${ value })`)
        )
    };
}
