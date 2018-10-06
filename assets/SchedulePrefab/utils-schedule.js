let WeChatUtil = require("utils-wechat");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //应该在所有的文件中只调用一次
        WeChatUtil.setOriginStorage();


        this.scheduleTime = cc.find("Canvas/scheduleTime");
        this.removeStoButton = this.scheduleTime.getChildByName("removeStoButton");
        this.startScheduleButton = this.scheduleTime.getChildByName("startScheduleButton");
        this.scheduleTimeLabel = this.scheduleTime.getChildByName("scheduleTimeLabel");
        this.scheduleTimeText = this.scheduleTimeLabel.getComponent(cc.Label);
        cc.log(this.scheduleTimeText);

        //是否开始倒计时
        this.changeShceduleLabel();
    },

    start() {

    },
    removeStartTimeStorage() {
        WeChatUtil.removeKeyStorageSync(WeChatUtil.storageValueAry[0].name);
    },
    startShceduleBtnCB() {
        if (WeChatUtil.getKeyStorageSync(WeChatUtil.storageValueAry[2].name) === "false") {
            WeChatUtil.setKeyStorageSync(WeChatUtil.storageValueAry[2].name, "true");
            this.changeShceduleLabel();
        }
        else {
            console.log("123123", WeChatUtil.getKeyStorageSync(WeChatUtil.storageValueAry[2].name));
        }
    },
    changeShceduleLabel() {
        //是否开始倒计时
        if (WeChatUtil.getKeyStorageSync(WeChatUtil.storageValueAry[2].name) === "true") {
            let startTime = WeChatUtil.getKeyStorageSync(WeChatUtil.storageValueAry[0].name);
            if (startTime === "null") {
                startTime = new Date().getTime();        
                WeChatUtil.setKeyStorageSync(WeChatUtil.storageValueAry[0].name, "" + startTime);
            }

            let currentTime = new Date().getTime();
            let passTime = (currentTime - Number(startTime))/1000;
            let totalScheduleTime = WeChatUtil.getKeyStorageSync(WeChatUtil.storageValueAry[1].name);
            let lastTime = Math.floor(Number(totalScheduleTime) - passTime);

            console.log("currentTime",currentTime);            
            console.log("startTime",startTime);           
            console.log("passTime",passTime);            
            console.log("lastTime",lastTime);            
            console.log("WeChatUtil.secToTime(lastTime)",WeChatUtil.secToTime(lastTime));            
            this.scheduleTimeText.string = WeChatUtil.secToTime(lastTime) + "";

            this.schedule(function () {
                console.log("1");
                lastTime -= 1;
                this.scheduleTimeText.string = "" + WeChatUtil.secToTime(lastTime);
            }, 1, cc.macro.REPEAT_FOREVER);
        }
    },
    setScheduleString(){
         console.log("123");
    },
    scheudleBtnCB() {
        this.removeStoButton.active = !this.removeStoButton.active;
        this.scheduleTimeLabel.active = !this.scheduleTimeLabel.active;
        this.startScheduleButton.active = !this.startScheduleButton.active;
    }

    // update (dt) {},
});
