/**
 * 缓冲动作实例
 */
cc.Class({
    extends: cc.Component,

    properties: {
        nodeSpriteFrame: cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._inNode = new cc.Node();
        this._inNode.addComponent(cc.Sprite);
        this._inNode.getComponent(cc.Sprite).spriteFrame = this.nodeSpriteFrame;
        this._inNode.parent = this.node;
        this._inNode.setPosition(cc.v2(300, -150));

        this._outNode = new cc.Node();
        this._outNode.addComponent(cc.Sprite);
        this._outNode.getComponent(cc.Sprite).spriteFrame = this.nodeSpriteFrame;
        this._outNode.parent = this.node;
        this._outNode.setPosition(cc.v2(500, -150));
        this._outNode.color = cc.Color.GRAY;

        this._inOutNode = new cc.Node();
        this._inOutNode.addComponent(cc.Sprite);
        this._inOutNode.getComponent(cc.Sprite).spriteFrame = this.nodeSpriteFrame;
        this._inOutNode.parent = this.node;
        this._inOutNode.setPosition(cc.v2(700, -150));
        this._inOutNode.color = cc.Color.YELLOW;
    },

    start() {

    },

    // update (dt) {},
});
