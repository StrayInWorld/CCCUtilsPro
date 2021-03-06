//创建物理边界
cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0)
    },

    // use this for initialization
    onLoad: function () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        //是否绘制边界
        physicsManager.debugDrawFlags =
            // 0;
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;

        let width = this.size.width || this.node.width;
        let height = this.size.height || this.node.height;
        let node = new cc.Node();
        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        this._addBound(node, 0, height / 2, width, 20);   //上面
        this._addBound(node, 0, -height / 2, width, 20);  //下面
        this._addBound(node, -width / 2, 0, 20, height);  //左边
        this._addBound(node, width / 2, 0, 20, height);   //右边

        node.parent = this.node;
        // node.group = "evmwnt";
        // cc.log("bound",node.group);
    },

    _addBound(node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
    }
});