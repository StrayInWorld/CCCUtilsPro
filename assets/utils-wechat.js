let GlobalData = require("interface-config");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //要写入缓存的值
        this.storageValueAry = [
            { "name": "startTime", "num": null },      //开始倒计时的时间
            { "name": "scheduleTime", "num": 18000 },  //倒计时总共时间
            { "name": "isScheduleTime", "num": false } //是否开始倒计时
        ];

        this.appId = 'wxd4b382fb6d063d6e';
    },

    start() {

    },


    /**
     * 判断是否为微信环境
     * @param   可传入多个参数，使用时第一个参数应该为调用的函数，后面的参数为第一个参数函数的形参
     */
    isRunWeChat() {
        if (CC_WECHATGAME) {
            return true;
        }
        else {
            console.log("please run in wechat");
            return false;
        }
    },


    /**
     * 设置初始缓存（异步）
     */
    setOriginStorage() {
        if (this.isRunWeChat()) {
            for (let i = 0; i < this.storageValueAry.length; i++) {
                let keyValue = this.storageValueAry[i].name;
                let numValue = this.storageValueAry[i].num;
                wx.getStorage({
                    key: keyValue,
                    success: function (res) {
                        console.log("get origin storage success");
                        return;
                    },
                    fail: function () {
                        console.log("get storage fail");
                        wx.setStorage({
                            key: keyValue,
                            data: "" + numValue,
                            success: function () {
                                console.log("set storage success");
                            },
                            fail: function () {
                                console.log("set storage fail");
                            }
                        })
                    },
                    complete: function () {

                    }
                })
            }

        }
    },


    /**
     * 同步清除指定缓存Key
     * @param removeKey  要清除的缓存键
     */
    removeKeyStorageSync(removeKey) {
        if (this.isRunWeChat()) {
            wx.removeStorageSync(removeKey);
            console.log("removeKey:", removeKey);
        }
    },


    /**
     * 同步获取指定缓存
     * @param getKey  要获取的缓存键
     * @returns  对应key的缓存值
     */
    getKeyStorageSync(getKey) {
        if (this.isRunWeChat()) {
            let value = wx.getStorageSync(getKey);
            console.log("getKey:", getKey, ". result is:", value);
            return value;
        }
    },


    /**
     * 同步设置指定缓存
     * @param getKey  要获取的缓存键
     * @returns  对应key的缓存值
     */
    setKeyStorageSync(setKey, keyValue) {
        if (this.isRunWeChat()) {
            wx.setStorageSync(setKey, keyValue);
            console.log("setKey success,value is:", keyValue);
        }
    },


    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒: 00:00:00
     */
    secToTime(s) {
        var t = "";
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }

            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec;

        }
        return t;
    },

    //分享
    wxShare(shareType) {
        let appId = this.appId;
        let shareConfig = {};
        let defaultShareTitle = "帮我挪一挪";
        let defaultShartImg = canvas.toTempFilePathSync({
            destWidth: 500,
            destHeight: 400
        });
        let _self = this;

        if (this.isRunWeChat()) {
            wx.request({
                url: GlobalData.ShareUrl,
                data: {
                    appid: appId,
                    type: 1,
                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    console.log("request share success", res);
                    let data = res.data.item;
                    shareConfig.title = data.share_title;
                    shareConfig.image = GlobalData.ShareImgUrl + data.share_img;
                },
                fail() {
                    console.log("request share fail");
                    //获取不到，使用默认值
                    shareConfig.title = defaultShareTitle;
                    shareConfig.image = defaultShartImg;
                },
                complete() {
                    wx.shareAppMessage({
                        title: shareConfig.title,
                        imageUrl: shareConfig.image,
                        success: function () {
                            console.log("shareAppMessage success");
                        },
                        fail: function () {
                            console.log("shareAppMessage fail");
                        }
                    })

                }
            })
        }
    },

    //底部广告
    showWXBanner() {
        if (this.isRunWeChat()) {
            let appUnitId = 'adunit-7613d8a09bcb9e95'
            let winSize = wx.getSystemInfoSync();
            console.log(winSize);
            let bannerHeight = 80;
            let bannerWidth = 300;
            this._bannerAd = wx.createBannerAd({
                adUnitId: appUnitId, //填写广告id 
                style: {
                    left: 0,
                    top: winSize.windowHeight - bannerHeight,
                    width: winSize.windowWidth,
                }
            });
            this._bannerAd.show(); //banner 默认隐藏(hide) 要打开   
            //微信缩放后得到banner的真实高度，从新设置banner的top 属性    
            this._bannerAd.onResize(res => {
                this._bannerAd.style.top = winSize.windowHeight - this._bannerAd.style.realHeight;

            })
        }
    },

    //视频广告
    watchWXVieo() {
        let _self = this;
        let isRuning = false;
        let appUnitId = 'adunit-791e60264d449d4a';

        if (this.isRunWeChat()) {
            let videoAd = wx.createRewardedVideoAd({
                adUnitId: appUnitId
            })

            videoAd.load()
                .then(() => videoAd.show())
                .catch(err => console.log(err.errMsg))

            videoAd.onClose(function (res) {
                if (res.isEnded && !isRuning) {
                    isRuning = true;
                    console.log("videoAd is ended");
                }

            });
        }

    }
});
