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



        this.title = cc.find("title", this.node);
        let widget = this.title.getComponent(cc.Widget);
        widget.updateAlignment();
        this.title1 = cc.find("title1", this.node);
        this.titleAry = [this.title, this.title1];

        let pos = this.title.position;
        this.title1.setPosition(cc.v2(pos.width, pos.y));
        this.title1.runAction(cc.flipX(true));
        cc.log(pos.x, pos.y);

        cc.log("this.title1.position:", this.title1.position);
        cc.log("this.titleAry[1].x onLoad", this.titleAry[1].x);
    },

    start() {

    },
    update(dt) {
        // cc.log("this.titleAry[1].x update", this.titleAry[1].x);
    },
});
