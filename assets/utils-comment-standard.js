//文档注释（文档注释必须包含一个或多个注释标签。）
// @module。声明模块

/**

 * 模块说明(说明模块内容)

 * @module 模块名（当前模块名）

 */



//-------------------------------------------
//@class。声明类
//@class必须搭配 @constructor或 @static使用，分别标记非静态类与静态类。

/**

 * 类说明（说明类内容）

 * @class 类名

 * @constructor

 */


//--------------------------------------- 
//@method。声明函数或类方法
// 没有指定@for时，表示此函数为全局或模块顶层函数。当函数为静态函数时，必须添加@static；当函数有参数时，必须使用@param；当函数有返回值时，必须使用@return。

/**

 * 方法说明

 * @method 方法名

 * @for 所属类名

 * @param {参数类型} 参数名 参数说明

 * @return {返回值类型} 返回值说明

 */


/**

 * 返回当前集合中指定位置的元素

 * @method

 * @for NodeList

 * @param {Number} [i=0] 位置下标。如果为负数，则从集合的最后一个元素开始倒数

 * @return {Element} 指定元素

 */


//--------------------------------------- 

//@property。声明类属性
/**

* 属性说明

* @property {属性类型} 属性名

*/






cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    //输出注释规范
    showStandard() {
    },

    // TODO 未处理IE6-8的兼容性
    setOpacity(node, val) {
        node.style.opacity = val;
    }
    // update (dt) {},
});
