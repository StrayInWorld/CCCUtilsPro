cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        prefab: cc.Prefab,
        singleItem: cc.Node,
        loading:cc.Node
    },

    start() {
        let _self = this;
        wx.onMessage(data => {
            console.log("onMessage from master");
            // if (data.nickName && data.avatarUrl) {
            //     // _self.showUserData(data.nickName, data.avatarUrl);
            //     // fill the content by the blank targets.
            //     // (function () {
            //     //     for (let i = 0; i < 5; i++) {
            //     //         let node = cc.instantiate(_self.prefab);
            //     //         node.parent = _self.content;
            //     //     }
            //     // })();
            // };
            if (data.messageType === 1) {                     //获取好友排行
                _self.getFriendStorage(data.keyValue);
            }
            else if (data.messageType === 2) {                //提交数据
                _self.submitScore(data.keyValue, data.score);
            }
            else if (data.messageType === 3) {                //获取好友群排行
                _self.getGroupFriendData(data.keyValue);
                console.log("onMessage from master get group");
            }
        });


    },
    removeOriginRecore() {
        this.content.removeAllChildren();
        this.singleItem.removeAllChildren();
        this.loading.active = true;
    },
    getMyUserInfo() {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: function (res) {
                console.log('wx.getUserInfo success', res.data)
            },
            fail: function (res) {
                reject("fail: ", res)
            }
        })
    },
    //获取好友数据
    getFriendStorage(keyValue) {
        this.removeOriginRecore();
        let _self = this;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: function (userRes) {
                let userData = userRes.data[0];
                console.log('getMyUserInfo success:', userData);

                wx.getFriendCloudStorage({
                    keyList: [keyValue],
                    success: function (res) {
                        _self.loading.active = false;
                        let data = res.data;
                        data.sort((a, b) => {
                            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                return 0;
                            }
                            if (a.KVDataList.length == 0) {
                                return 1;
                            }
                            if (b.KVDataList.length == 0) {
                                return -1;
                            }
                            return b.KVDataList[0].value - a.KVDataList[0].value;
                        });

                        console.log("data:", data);
                        //将长度修改为固定值，并将removeOriginRecord()关闭，即可测试拖动是否合理。
                        for (let i = 0; i < data.length; i++) {
                            let friend = data[i];
                            if (!_self.preSettingData(i, friend, ' stop getting friends\' infos')) {
                                return;
                            }

                            //添加个人数据
                            if (friend.avatarUrl == userData.avatarUrl) {
                                console.log("添加个人数据");
                                _self.showUserData(i, friend.nickname, friend.avatarUrl, friend.KVDataList,false);
                            }
                            // _self.showUserData(i,res.data[i].nickname,res.data[i].avatarUrl,res.data[i].KVDataList);
                        }
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                });
            },
            fail: function () {
                console.log("getUserInfo fail");
            }

        })
    },
    preSettingData(rank, user, str) {
        if (!user) {
            console.log("preSettingData", str);
            return false;
        }
        if (user.KVDataList.length === 0) {
            console.log("user.KVDataList.length = 0 is",user);
            return false;
        }
        console.log("userInfo:", user);
        this.showUserData(rank, user.nickname, user.avatarUrl, user.KVDataList);
        return true;
    },
    showUserData(rank, nickName, avatarUrl, KVDataList,InContentNode=true) {
        let node = cc.instantiate(this.prefab);        
        if(!InContentNode){
            node.parent = this.singleItem;
            node.setPosition(cc.v2(5,-10));
            console.log("node position:",node.position);
        }
        else{
            node.parent = this.content;
        }

        let userName = node.getChildByName('userName').getComponent(cc.Label);
        let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
        let score = node.getChildByName("score").getComponent(cc.Label);
        let rankNode = node.getChildByName("rankNode");
        let rankIcon = rankNode.getChildByName("rankingIcon");
        let rankLabel = rankNode.getChildByName("rankingLabel");
        rankIcon.enabled = false;
        rankLabel.enabled = false;

        let bgNode = node.getChildByName("bg_node");
        let whiteBg = bgNode.getChildByName("white");
        whiteBg.active = false;
        let blue = bgNode.getChildByName("blue");
        blue.active = false;

        switch (rank) {
            case 0:
                rankIcon.active = true;
                rankIcon.getChildByName("gold").active = true;
                break;
            case 1:
                rankIcon.active = true;
                rankIcon.getChildByName("silver").active = true;
                break;
            case 2:
                rankIcon.active = true;
                rankIcon.getChildByName("copper").active = true;
                break;
        }
        if (rank > 2) {
            rankLabel.active = true;
            let rankValue = rankLabel.getComponent(cc.Label);
            rankValue.string = rank + 1;
        }
        if (rank % 2 === 0) {
            whiteBg.active = true;
        }
        else {
            blue.active = true;
        }

        userName.string = nickName;
        // console.log("KVDataList:", KVDataList);
        // console.log("KVDataList[0]:", KVDataList[0]);         //{key: "score", value: "123123"}
        // console.log("KVDataList[0]:", KVDataList[0].value);  //123123

        score.string = '' + KVDataList[0].value;
        console.log(nickName + '\'s info has been getten.');
        cc.loader.load({
            url: avatarUrl, type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            console.log(texture);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
    },
    //提交数据
    submitScore(keyValue, score) { //提交得分
        console.log("this is submitScore");
        wx.getUserCloudStorage({
            // 以key/value形式存储
            keyList: [keyValue],
            success: function (getres) {
                console.log('getUserCloudStorage', 'success', getres)
                if (getres.KVDataList.length != 0) {
                    if (getres.KVDataList[0].value > score) {
                        return;
                    }
                }
                // 对用户托管数据进行写数据操作
                wx.setUserCloudStorage({
                    KVDataList: [{ key: keyValue, value: "" + score }],
                    success: function (res) {
                        console.log('setUserCloudStorage', 'success', res)
                    },
                    fail: function (res) {
                        console.log('setUserCloudStorage', 'fail')
                    },
                    complete: function (res) {
                        console.log('setUserCloudStorage', 'complete')
                    }
                });
            },
            fail: function (res) {
                console.log('getUserCloudStorage', 'fail')
            },
            complete: function (res) {
                console.log('getUserCloudStorage', 'ok')
            }
        });
    },

    //获取好友群信息
    getGroupFriendData(keyValue, shareTicket) {
        console.log("getGroupFriendData running");
        this.removeOriginRecore();
        let _self = this;
        // this.rankingScrollView.node.active = true;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (userRes) => {
                console.log('getUserInfo success', userRes.data);
                let userData = userRes.data[0];
                console.log('getUserInfo userData', userData);
                //取出所有好友数据
                wx.getGroupCloudStorage({
                    shareTicket: shareTicket,
                    keyList: [keyValue],
                    success: res => {
                        console.log("wx.getGroupCloudStorage success", res);
                        // this.loadingLabel.active = false;
                        let data = res.data;
                        data.sort((a, b) => {
                            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                return 0;
                            }
                            if (a.KVDataList.length == 0) {
                                return 1;
                            }
                            if (b.KVDataList.length == 0) {
                                return -1;
                            }
                            return b.KVDataList[0].value - a.KVDataList[0].value;
                        });
                        for (let i = 0; i < data.length; i++) {
                            var playerInfo = data[i];
                            // var item = cc.instantiate(this.prefabRankItem);
                            // item.getComponent('RankItem').init(i, playerInfo);
                            // this.scrollViewContent.addChild(item);
                            // if (data[i].avatarUrl == userData.avatarUrl) {
                            //     let userItem = cc.instantiate(this.prefabRankItem);
                            //     userItem.getComponent('RankItem').init(i, playerInfo);
                            //     userItem.y = -354;
                            //     this.node.addChild(userItem, 1, 1000);
                            // }
                            if (!_self.preSettingData(i, playerInfo, ' stop getting friends\' infos')) {
                                return;
                            }
                        }
                        if (data.length <= 8) {
                            let layout = this.scrollViewContent.getComponent(cc.Layout);
                            layout.resizeMode = cc.Layout.ResizeMode.NONE;
                        }
                    },
                    fail: res => {
                        console.log("wx.getFriendCloudStorage fail", res);
                        // this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                        console.log("数据加载失败，请检测网络，谢谢");
                    },
                });
            },
            fail: (res) => {
                // this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                console.log("数据加载失败，请检测网络，谢谢");
            }
        });
    },

});
