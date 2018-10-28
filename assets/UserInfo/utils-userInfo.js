/**
 * 获取权限按钮应该放在与开始按钮相同的位置。
 * 还没有调好，应该有弹框的。
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (CC_WECHATGAME) {

            let btnNode = this.node;
            let btnSize = cc.size(btnNode.width + 10, btnNode.height + 10);
            let frameSize = cc.view.getFrameSize();
            let winSize = cc.director.getWinSize();
            console.log("winSize: ", winSize);
            console.log("frameSize: ", frameSize);
            //适配不同机型来创建微信授权按钮
            let left = (winSize.width * 0.5 + btnNode.x - btnSize.width * 0.5) / winSize.width * frameSize.width;
            let top = (winSize.height * 0.5 - btnNode.y - btnSize.height * 0.5) / winSize.height * frameSize.height;
            let width = btnSize.width / winSize.width * frameSize.width;
            let height = btnSize.height / winSize.height * frameSize.height;
            console.log("button pos: ", cc.v2(left, top));
            console.log("button size: ", cc.size(width, height));

            let self = this;
            self.btnAuthorize = wx.createUserInfoButton({
                type: 'text',
                text: '123',
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                    lineHeight: 40,
                    backgroundColor: '',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            })

            self.btnAuthorize.onTap((uinfo) => {
                console.log("onTap uinfo: ", uinfo);
                if (uinfo.userInfo) {
                    console.log("wxLogin auth success");
                    wx.showToast({ title: "授权成功" });
                    self.btnAuthorize.destroy();  //销毁按钮
                    // _self.getAuthorize();      //获取权限成功调用函数
                } else {
                    console.log("wxLogin auth fail");
                    wx.showToast({ title: "授权失败" });
                }
            });
        }
        else {
            cc.log("get userInfo use in wechat");
        }

    },

    start() {

    },

    // update (dt) {},
});
