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

        this._moveTime = 0.5;
    },

    start() {

    },

    setOriginStatus() {
        this._inNode.setPosition(cc.v2(300, -150));
        this._inNode.stopAllActions();

        this._outNode.setPosition(cc.v2(500, -150));
        this._outNode.stopAllActions();

        this._inOutNode.setPosition(cc.v2(700, -150));
        this._inOutNode.stopAllActions();

        cc.log("time:", this._moveTime);
    },


    setActionTime(event) {
        let progress = event.node.getComponent(cc.Slider).progress;
        this._moveTime = 1 + progress;
    },

    easeOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeIn(3.0)));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeOut(3.0)));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeInOut(3.0)));
    },

    exponentialOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeExponentialIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeExponentialOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeExponentialInOut()));
    },

    sineOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeSineIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeSineOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeSineInOut()));
    },

    elasticOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeElasticIn(3.0)));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeElasticOut(3.0)));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeElasticInOut(3.0)));
    },

    bounceOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeBounceIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeBounceOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeBounceInOut()));
    },

    backOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeBackIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeBackOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeBackInOut()));
    },

    quadraticActionOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeQuadraticActionIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeQuadraticActionOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeQuadraticActionInOut()));
    },

    circleOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeCircleActionIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeCircleActionOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeCircleActionInOut()));
    },

    cubicOpa() {
        this.setOriginStatus();
        this._inNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeCubicActionIn()));
        this._outNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeCubicActionOut()));
        this._inOutNode.runAction(cc.moveBy(this._moveTime, cc.v2(0, 100)).easing(cc.easeCubicActionInOut()));
    },

    // update (dt) {},
});
