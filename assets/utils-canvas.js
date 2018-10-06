let WeChatUtil = require("utils-wechat");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        WeChatUtil.isRunWeChat(WeChatUtil.setOriginStorage);
    },

    start () {

    },
    removeStartTimeStorage(){
        WeChatUtil.isRunWeChat(WeChatUtil.removeKeyStorageSync,WeChatUtil.storageValueAry[0].name);
    },
    startShceduleBtnCB(){
        let scheduleTime = cc.find("Canvas/scheduleTime");
        let scheduleTimeLabel  = scheduleTime.getChildByName("scheduleTimeLabel");
        let scheduleTimeText = scheduleTimeLabel.getComponent(cc.Label);
        
        if(WeChatUtil.isRunWeChat(WeChatUtil.getKeyStorageSync,WeChatUtil.storageValueAry[0].name!==null)){

        }
    },
    scheudleBtnCB(){
        let scheduleTime = cc.find("Canvas/scheduleTime");
        let removeStoButton  = scheduleTime.getChildByName("removeStoButton");
        let scheduleTimeLabel  = scheduleTime.getChildByName("scheduleTimeLabel");
        let startScheduleButton  = scheduleTime.getChildByName("startScheduleButton");

        removeStoButton.active = !removeStoButton.active;
        scheduleTimeLabel.active = !scheduleTimeLabel.active;
        startScheduleButton.active = !startScheduleButton.active;
    }

    // update (dt) {},
});
