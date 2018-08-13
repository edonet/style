/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-10 13:53:48
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss?global';
import style from './style.json';
import * as stand from '@arted/stand-loader?name=APP_STYLE';


/**
 *****************************************
 * 抛出对象
 *****************************************
 */
export default { ...style, ...stand };


/**
 *****************************************
 * 热更新
 *****************************************
 */
if (module.hot) {
    module.hot.accept(err => console.error(err));
}
