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
import './public/reset.css';
import './public/common.css';
import './public/transition.css';
import settings from './settings.json';


/**
 *****************************************
 * 抛出对象
 *****************************************
 */
export default settings;


/**
 *****************************************
 * 热更新
 *****************************************
 */
if (module.hot) {
    module.hot.accept(err => console.error(err));
}
