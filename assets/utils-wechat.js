module.exports = {
    //要写入缓存的值
    storageValueAry: [
        { "name": "startTime", "num": null },
        { "name": "scheduleTime", "num": 18000 }
    ],

    /**
     * 判断是否为微信环境
     * @param   可传入多个参数，使用时第一个参数应该为调用的函数，后面的参数为第一个参数函数的形参
     */
    isRunWeChat() {
        if (CC_WECHATGAME) {
            let context = [].shift.call(arguments);
            let args = [].slice.call(arguments);    // 剩余的参数转为数组
            context.bind(this)(args);
        }
        else {
            console.log("please run in wechat");
        }
    },

    /**
     * 设置初始缓存（异步）
     */
    setOriginStorage() {
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
    },

    /**
     * 同步清除指定缓存Key
     * @param removeKey  要清除的缓存键
     */
    removeKeyStorageSync(removeKey) {
        removeKey = arguments[0][0];
        wx.removeStorageSync(removeKey);
        console.log("removeKey:", removeKey);
    },

    /**
     * 同步获取指定缓存
     * @param getKey  要获取的缓存键
     * @returns  对应key的缓存值
     */
    getKeyStorageSync(getKey) {
        getKey = arguments[0][0];
        let value = wx.getStorageSync(getKey);
        console.log("getKey:", value);
        return value;
    },

    /**
     * 同步设置指定缓存
     * @param getKey  要获取的缓存键
     * @returns  对应key的缓存值
     */
    setKeyStorageSync(setKey,keyValue) {
        setKey = arguments[0][0];
        keyValue = arguments[0][1];
        let value = wx.setStorageSync(setKey,keyValue);
        console.log("setKey:", value);    
    },


    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒: 00:00:00
     */
    secToTime(s) {
        var t;
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
    }


}