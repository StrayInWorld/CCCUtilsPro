let WeChatUtil = require("utils-wechat");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // let close = cc.find("Canvas/New Node/New Node/btn_close");
        // cc.log(close);

        // this.node.on("touchstart",function(event){
        //     cc.log("event touch:",event.getLocation());

        //     let pos  = close.parent.parent.convertToNodeSpaceAR(event.getLocation());
        //     close.runAction(cc.moveTo(0.1,pos));
        // },this);
    },

    start() {

    },
    update(dt) {
        // cc.log("this.titleAry[1].x update", this.titleAry[1].x);
    },
});
