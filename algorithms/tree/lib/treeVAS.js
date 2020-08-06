
/*
* 关于树的算法可视化
* 图形框架
*
* @dependent 依赖库
* -class.js 详见 John Resig 的博客 inheritance
* -pixi.js
* -tween.js
*
* */
const T = {}

/*
* 设置类
* */
T.Config = Class.extend({

    /*
    * 构造函数
    *
    * @param d(obj) 参数配置
    *
    * d(obj) 里面的设置选项见 T.Config.DEFAULT
    * */
    init: function (d = {}) {
        this.data = {};
        for(let key in this.DEFAULT){
            this.data[key] = d[key] ? d[key] : this.DEFAULT[key];
        }
    },

    /*
    * 这里保存默认设置
    *
    * @width 画布宽度
    * @height: 画布高度
    * @resizeTo: 自适应节点，如果该选项被设置，则无视width和height参数
    * @view: 提供上下文的画布
    * @backgroundColor: 背景颜色
    * @antialias: 开启WebGl抗锯齿
    * */
    DEFAULT: {
        width: 800,
        height: 800,
        resizeTo: undefined,
        view: undefined,
        backgroundColor: 0x000000,
        antialias: true,
        resolution: 1,
        animate: 800,
        bottom: 50
    },

    /*
    * query 获取或设置一项配置
    *
    * @param k(String) 获取配置的Key
    * @param d(String|Number|Obj|Bool) 要设置的类型
    * */
    query: function (k, d = undefined) {
        if (!k) return false;
        if (d !== undefined) return this.data[k] = d;
        return (this.data[k] !== undefined) ? this.data[k] : false;
    }
});

/*
* 节点类
* */
T.Node = Class.extend({

    /*
    * 初始化
    * */
    init: function (t, d = {}) {

        /*
        * 收集数据
        * */
        this.tree = t;
        this.data = {
            x: d.x || 50,
            y: d.y || 50,
            r: d.r || 40,
            s: d.s || .8,
            cb: d.cb || (()=>{}),
            layer: d.layer,
            pid: d.pid,
            text: d.text ||
                String.fromCharCode(d.layer+96) + d.pid
        }

        /*
        * 计算树的层数
        * */
        this.tree.layer = this.data.layer > this.tree.layer ?
            this.data.layer : this.tree.layer;

        /*
        * 设置颜色参数
        * */
        this.bgColor = {r: 255, g: 255, b: 255};
        this.link = [];
        this.pa = d.father;
        this.ch = [];
        this.centerCount = 0;
        this.isSign = false;
        // this.x = this.data.x;
        // this.y = this.data.y;
        this.x = this.pa ? this.pa.x : 50;
        this.y = this.pa ? this.pa.y : 50;
        // console.log([this.x, this.y]);
        this.temp = {
            x: this.x,
            y: this.y
        };

        /*
        * 设置根容器
        * 和图形容器
        * */
        this.root = new PIXI.Container();
        this.arc = new PIXI.Graphics();
        this.text = new PIXI.Text(this.data.text, new PIXI.TextStyle({
            fontFamily: 'Verdana',
            fontSize: 32,
            fill: "#5a5a5a",
        }));
        this.text.y = -1.5;
        this.text.anchor.set(.5, .5);
        this.root.addChild(this.arc);
        this.root.addChild(this.text);
        this.root.scale.set(0);
        this.root.zIndex = 2;
        this.pos();

        /*
        * 这里绑定点击事件
        * */
        this.root.interactive = true;
        this.root.buttonMode = true;
        this.root.on('pointerdown', ()=>{this.click()});

        /*
        * 首次绘制图像
        * */
        this.draw();
        this.start();
        this.tree.add(this.root);
        this.lid = this.tree.addList(this);
    },

    /*
    * 更新标记信息
    * */
    updataText: function(){

        /*
        * 计算树的pid
        * */
        if (!this.tree.root.la[this.data.layer+1])
            this.tree.root.la[this.data.layer+1] = 0;

        /*
        * 调用pixi-text的set函数
        * */
        this.data.text = String.fromCharCode(this.data.layer + 96)
            + ++this.tree.root.la[this.data.layer];
        this.text.text = this.data.text;
    },

    /*
    * 点击事件
    * */
    click: function(){
        this.tree.clickCallBack(this);
        this.jump();
    },

    /*
    * 更新坐标
    * */
    pos: function(){
        this.root.x = this.tree.size.w(this.x);
        this.root.y = this.tree.size.h(this.y);
    },

    /*
    * 计算中心位置
    * 并移动
    * */
    center: function(){

        /*
        * 阻止自己递归调用center
        * 导致内存爆炸
        * */
        if (this.centerCount < this.ch.length - 1) return ++this.centerCount;
        if (this.ch.length === 0 && this.pa) return this.pa.center();
        this.centerCount = 0;

        /*
        * 计算子节点平均坐标
        * */
        let x = 0;
        this.ch.forEach((v)=>{
            x += v.temp ? v.temp.x : 0;
        });
        this.temp = {
            x: x / this.ch.length,
            y: (this.data.layer / (this.tree.layer + 1)) * 100
        }

        /*
        * 反向传播
        * */
        if (this.pa) this.pa.center();
    },

    /*
    * 重新排列子集坐标
    * 在center反向传播后
    * 递归调用
    * */
    subset: function(){

        /*
        * 分段均分坐标
        * */
        let cch = [];
        for (let i = 0; i < this.ch.length; i++){

            /*
            * 正向传播递归
            * */
            this.ch[i].subset();

            /*
            * 排除两点对称
            * */
            if (this.ch.length < 2) continue;

            /*
            * 第一项不参与计算
            * */
            if (i === 0) {
                cch.push(this.ch[0]);
                continue;
            }

            /*
            * 存在子集的不参与计算
            * */
            if (this.ch[i].ch.length === 0 && i !== this.ch.length - 1)
                cch.push(this.ch[i]);
            else {
                let fx1 = cch.shift().temp.x;
                let fx2 = this.ch[i].temp.x
                let avg = (fx2 - fx1) / (cch.length + 1);
                for (let j = 0; j < cch.length; j++) {
                    cch[j].temp.x = fx1 + avg * (j + 1);
                }
                cch = [this.ch[i]];
            }
        }
    },

    /*
    * 初始化动画
    * */
    start: function(){
        // console.log("run start");
        new TWEEN.Tween(this.root.scale)
            .to({x: this.data.s, y: this.data.s}, this.tree.asp)
            .easing(TWEEN.Easing.Elastic.Out)
            .onComplete(()=>{
                this.data.cb()
                this.tree.gride();
            }).start();
    },

    /*
    * 颜色格式转换
    * */
    colorParse: (c={r:255,g:255,b:255})=>
        ((1 << 24) + (c.r << 16) + (c.g << 8) + c.b - 0x1000000),

    /*
    * 重绘
    * */
    draw: function () {
        this.arc.clear();
        this.arc.lineStyle(3, 0x5a5a5a);
        this.arc.beginFill(this.colorParse(this.bgColor), 1);
        this.arc.drawCircle(0, 0, this.data.r);
        this.arc.closePath();
    },

    /*
    * 跳跃动画
    * */
    jump: function () {
        let big = new TWEEN.Tween(this.root.scale)
            .to({x: this.data.s+.3, y: this.data.s+.3}, this.tree.asp)
            .easing(TWEEN.Easing.Elastic.Out);
        let small = new TWEEN.Tween(this.root.scale)
            .to({x: this.data.s, y: this.data.s}, this.tree.asp)
            .easing(TWEEN.Easing.Elastic.Out);
        big.chain(small).start();
    },

    /*
    * 移动节点
    *
    * @param x(Number) 目标 X 坐标
    * @param y(Number) 目标 Y 坐标
    * */
    move: function (x, y) {
        // console.log(this.data.text+"-->"+x+","+y);

        /*
        * 如果网格计算错误
        * 在这里修复
        * */
        if (isNaN(x)) x = 50;
        new TWEEN.Tween(this)
            .to({x: x, y: y}, this.tree.asp)
            .onUpdate(()=>{
                this.pos();
                for (let i = 0; i < this.link.length; i++) this.link[i].draw()
            })
            .easing(TWEEN.Easing.Elastic.InOut).start();
    },

    /*
    * 颜色动画
    *
    * @param f(Bool) 是否填充颜色
    * */
    color: function (f = true) {
        let creatTween = (r, g, b) => new TWEEN.Tween(this.bgColor)
                .to({r: r, g: g, b: b}, this.tree.asp)
                .easing(TWEEN.Easing.Quartic.InOut)
                .onUpdate(()=>{this.draw()});

        if (f) creatTween(255, 120, 120).chain(creatTween(173, 217, 255)).start();
        else creatTween(255, 255, 255).start();
    },

    /*
    * 标记节点
    * */
    sign: function(){
        this.isSign = true;
        this.color(true);
        this.jump();
        return false;
    },

    /*
    * 清除节点标记
    *
    * @param r 是否递归执行
    * */
    reSign: function(r = true){
        this.isSign = false;
        this.color(false);
        if (!r) return false;
        for (let i = 0; i < this.ch.length; i++) this.ch[i].reSign(true);
    },

    /*
    * 销毁全部子节点和节点
    * */
    kill: function(){
        this.root.destroy();
        if (this.link.length > this.ch.length) this.link[0].root.destroy();
        this.link = undefined;
        this.ch.map((v)=>{v.kill()});
        let l = this.ch.length;
        for (let i = 0; i < l; i++) this.ch[0].kill();
        if (this.pa) this.pa.rm(this);
        delete this.tree.list[this.lid];
    },

    /*
    * 添加子节点
    * */
    add: function (cb = ()=>{}) {

        if (!this.tree.root.la[this.data.layer+1])
            this.tree.root.la[this.data.layer+1] = 0;
        let node = new T.Node(this.tree,
            {
                x: this.x,
                y: this.y,
                father: this,
                layer: this.data.layer + 1,
                cb: cb,
                pid: ++this.tree.root.la[this.data.layer+1]
            }
        );

        let link = new T.Link(this, node);
        node.link.push(link);
        this.tree.add(link.root);
        this.link.push(link);
        this.ch.push(node);
        node.id = this.ch.length - 1;
    },

    /*
    * 删除子节点
    * */
    rm: function (o) {
        this.ch.forEach((item, index)=>{
            if(item === o) this.ch.splice(index, 1);
        });
    }
});

/*
* 链接类
* */
T.Link = Class.extend({

    /*
    * 初始化函数
    *
    * @param par(T.Node) 父节点
    * @param chi(T.Node) 子节点
    * */
    init: function (par, chi) {
        this.par = par;
        this.chi = chi;
        this.rat = 60;
        this.root = new PIXI.Graphics();
        this.root.zIndex = 1;


        /*
        * 绘制一次
        * */
        this.draw();
        // this.start(x, y);
    },

    /*
    * 初始化动画
    * */
    start: function(x, y){
        new TWEEN.Tween(this.chi)
            .to({x: x, y: y}, this.par.tree.asp)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(()=>{this.chi.pos(); this.draw()})
            .start();
        new TWEEN.Tween(this)
            .to({rat: (this.par.tree.size.h(y) - this.par.root.y) }, this.par.tree.asp)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
    },

    /*
    * 重绘
    * */
    draw: function () {
        this.root.clear();
        this.root.lineStyle(2.5, 0x5a5a5a);
        this.root.moveTo(this.par.root.x, this.par.root.y);
        this.rat = (this.chi.root.y - this.par.root.y);
        this.root.bezierCurveTo(
            this.par.root.x, this.par.root.y + this.rat -
            Math.abs(this.chi.root.x - this.par.root.x)/20,
            this.chi.root.x, this.chi.root.y - this.rat,
            this.chi.root.x, this.chi.root.y
        );
    }
});

/*
* app 动画入口类
* */
T.app = Class.extend({

    /*
    * 构造函数
    *
    * @param config(T.Config) 传入配置
    * */
    init: function (config) {

        /*
        * 保存设置
        * */
        this.config = config;

        /*
        * 所有节点列表
        * */
        this.list = [];
        this.layer = 0;
        this.grideCount = 1;
        this.asp = this.config.query("animate");
        this.resting = true;
        this.clearning = true;
        this.clickCallBack = (dom)=>{};

        /*
        * 创建PIXI配置
        * */
        let pixiConfig = {
            view: this.config.query("view"),
            antialias: this.config.query("antialias"),
            backgroundColor: this.config.query("backgroundColor"),
            resolution: this.config.query("resolution")
        };
        if (this.config.query("resizeTo")) pixiConfig.resizeTo =
            this.config.query("resizeTo");
        else {
            pixiConfig.width = this.config.query("width");
            pixiConfig.height = this.config.query("height");
        }

        /*
        * 这里正式创建pixi渲染器
        * */
        this.app = new PIXI.Application(pixiConfig);

        /*
        * 初始化尺寸标尺
        * */
        this.size.init(this.app.renderer.view);

        /*
        * 开启主循环
        * */
        this.app.ticker.add(this.loop);

        /*
        * 开启排序
        * */
        this.app.stage.sortableChildren = true;

        /*
        * 启动自适应监听
        * */
        window.addEventListener("resize", ()=>this.resize());

        /*
        * 循环执行gride
        * */
        setInterval(()=>{this.grideCount = 1}, this.asp - 100);
    },

    /*
    * 动画循环
    * */
    loop: function () {
        TWEEN.update()
    },

    /*
    * 获取画布尺寸
    * */
    size: {

        /*
        * 初始化函数
        * 绑定app上下文
        * */
        init: function (app) {
            this.w = (e = 100) => (app.width/2)*(e/100);
            this.h = (e = 100) => (app.height/2)*(e/100);
         }
    },

    /*
    * 快速添加舞台对象
    * */
    add: function (o) {this.app.stage.addChild(o)},

    /*
    * 添加为节点列表
    * */
    addList: function(o){
        for (let i = 0; i < this.list.length; i++){
            if (!this.list[i]) {
                this.list[i] = o;
                return i;
            }
        }
        this.list.push(o);
        return this.list.length-1;
    },

    /*
    * 生成根节点
    * */
    creatRoot: function (cb){
        this.root = new T.Node(this,
            {x: 50, y: 50, text: "a1", layer: 1, pid: 1,
                cb: ()=>{cb ? cb() : 0;}
            }
        );
        this.gride();
        this.root.la = [0, 0];
    },

    /*
    * 自适应函数
    * */
    resize: function () {

        for (let i = 0; i < this.list.length; i++){
            if (this.list[i]) {
                this.list[i].pos();
                if(this.list[i].link.length)this.list[i].link[0].draw();
            }
        }
    },

    /*
    * 将当前树转换为简单对象
    * */
    toJson: function(){
        if (!this.root) return false;

        let res = {ch:[]};

        /*
        * 递归搜索下一个节点
        * */
        let nn = (tag, node) => {
            for (let i = 0; i < node.ch.length; i++){
                let t = {ch:[]};
                tag.ch.push(t);
                nn(t, node.ch[i]);
            }
        }
        nn(res, this.root);
        return res;
    },

    /*
    * 更新每个节点的标记
    * */
    updataNodeText: function(){
        if (!this.root) return false;
        this.root.la = [0, 0];

        /*
        * 递归修改节点信息
        * */
        let nn = (node) => {

            /*
            * 计算层数
            * */
            if (!node.pa) node.data.layer = 1;
            else node.data.layer = node.pa.data.layer + 1;

            /*
            * 计算编码数字
            * */
            node.updataText();

            /*
            * 递归遍历子节点
            * */
            for (let i = 0; i < node.ch.length; i++){
                nn(node.ch[i]);
            }
        }
        nn(this.root);
    },

    /*
    * 按深度权重计算断点评分网格
    * */
    gride: function () {
        if (!this.root) return false;

        /*
        * 收索断点
        * */
        let frList = [0];
        let nodeList = [];
        let frSum = 0;
        let next = 0;

        /*
        * 这里在树中递归搜索断点
        * */
        let search = (node)=>{
            if (node.ch.length === 0){
                let scs = node.data.layer / this.layer;
                frList[frList.length - 1] += scs;
                frList.push(scs);
                frSum += scs * 2;
                return nodeList.push(node);
            }
            node.ch.forEach((v)=>{
                search(v)
            })
        }
        search(this.root);

        /*
        * 填充边距
        * */
        frList[0] += 1;
        frList[frList.length - 1] += 1;
        frSum += 2;

        /*
        * 计算断点相对坐标
        * */
        for (let i = 0; i < nodeList.length; i++){
            next += frList[i];
            nodeList[i].temp = {
                x: next / frSum * 100,
                y: (nodeList[i].data.layer / (this.layer + 1)) * 100};

            /*
            * 这里递归计算中心点坐标
            * */
            nodeList[i].center();
        }

        /*
        * 递归
        * 重新排列全部没有子集的节点
        * 计算分布均和位置
        * */
        this.root.subset();

        /*
        *
        * */
        if (!this.grideCount) return false;
        this.grideCount = 0;

        for (let i = 0; i < this.list.length; i++){
            this.list[i].move(this.list[i].temp.x, this.list[i].temp.y);
        }

    },

    /*
    * 重置全部参数
    * 杀死节点树
    * */
    reset: function(cb = ()=>{}){
        if (!this.resting || !this.root) return false;
        this.resting = false;
        new TWEEN.Tween(this.app.stage)
            .to({alpha: 0}, this.asp)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(()=>{
                this.root.kill();
                this.list = [];
                this.layer = 0;
                this.grideCount = 1;
                this.root = undefined;
                this.app.stage.alpha = 1;
                this.resting = true;
                cb();
            }).start();
    },

    /*
    * 清除节点标记
    * */
    clearn: function(){
        if (!this.clearning || !this.root) return false;
        this.clearning = false;
        this.root.reSign(true);
        setTimeout(()=>this.clearning = true, this.asp);
    },

    /*
    * 播放动画定时器
    *
    * 私有属性
    * 不要在外面调用
    * */
    _timeOutAn: function(ticker){
        this.s = setInterval(()=>{
            if(!this.next()) {
                clearInterval(this.s);
                this.using = false;
                this.onEnd ? this.onEnd() : "";
            }
        }, ticker);
    },

    /*
    * 自动播放
    *
    * 私有属性
    * 不要在外面调用
    * */
    _autoAn: function () {

        /*
        * 暂停
        * */
        if (!this.autoing) {
            clearInterval(this.s);
            this.autoing = true;
            return false
        }

        /*
        * 启动
        * */
        this.autoing = false;
        this.timeOut(this.tree.asp);
        return true;
    },

    /*
    * 瞬间完成动画
    * */
    _endAn: function () {
        this.timeOut(1);
    },

    /*
    * 渲染一棵树
    * */
    renderer: function (tree) {

        /*
        * 创建控制句柄
        * */
        return {
            tag: tree,
            tree: this,
            nextNode: null,
            autoing: true,
            using: true,
            pullRoot: () => this.creatRoot(),
            next: function () {

                /*
                * 根节点生成
                * 注意这里在randerer外面无法控制
                * */
                if (this.pullRoot) {
                    this.pullRoot = this.pullRoot();
                    return this.nextNode = this.tree.root;
                }

                /*
                * 生成节点
                * */
                if (!this.nextNode) return this.using = false;
                this.nextNode = this.nextNode.add();

                /*
                * 递归搜索下一个节点
                * */
                let nn = (tag, node) => {
                    if (this.nextNode) return false;
                    for (let i = 0; i < tag.ch.length; i++){
                        if (tag.ch[i] && !node.ch[i]) this.nextNode = node;
                        else nn(tag.ch[i], node.ch[i]);
                    }
                }
                nn(this.tag, this.tree.root);
                return true;
            },

            /*
            * 播放动画定时器
            * */
            timeOut: this._timeOutAn,

            /*
            * 自动播放
            * */
            auto: this._autoAn,

            /*
            * 瞬间完成动画
            * */
            end: this._endAn
        };
    },

    /*
    * 遍历一棵树
    * */
    ergodic: function (Fn) {

        /*
        * 创建控制句柄
        * */
        return {
            tree: this,
            nextNode: false,
            autoing: true,
            using: true,
            pullRoot: () => this.creatRoot(),
            next: function () {

                /*
                * 递归搜索下一个节点
                * */
                Fn.call(this, this.tree.root);

                /*
                * 标记下一个节点
                * */
                if (!this.nextNode) return this.using = false;
                this.nextNode = this.nextNode.sign();

                return true;
            },

            /*
            * 播放动画定时器
            * */
            timeOut: this._timeOutAn,

            /*
            * 自动播放
            * */
            auto: this._autoAn,

            /*
            * 瞬间完成动画
            * */
            end: this._endAn
        };
    }
});

/*
* 这里存放二叉树遍历算法
* */
T.ergodicFn = {

    /*
    * 前序遍历算法
    * */
    NLR: function (node) {
        if (this.nextNode) return false;
        if (!node.isSign) return this.nextNode = node;
        for (let i = 0; i < node.ch.length; i++){
            arguments.callee.call(this, node.ch[i]);
        }
    },

    /*
    * 中序遍历算法
    * */
    LNR: function (node) {
        if (this.nextNode) return false;
        if (node.ch.length >= 1) arguments.callee.call(this, node.ch[0]);
        if (this.nextNode) return false;
        if (!node.isSign) return this.nextNode = node;
        if (this.nextNode) return false;
        if (node.ch.length >= 2) arguments.callee.call(this, node.ch[1]);
    },

    /*
    * 前序遍历算法
    * */
    LRN: function (node) {
        if (this.nextNode) return false;
        for (let i = 0; i < node.ch.length; i++){
            arguments.callee.call(this, node.ch[i]);
        }
        if (this.nextNode) return false;
        if (!node.isSign) return this.nextNode = node;
    },

    /*
    * 层序遍历算法
    * */
    Layer: function (root) {
        if ( !root ) return false;//如果头结点为空、返回假

        let tree = []; //创建一个数组存放二叉树

        tree.push(root); //先传入头结点

        while( tree.length ){
            let node = tree.shift();    // 将数组第一个结点放到node中

            if (!node.isSign) return this.nextNode = node;

            /*
            * 推入全部子节点
            * */
            for (let i = 0; i < node.ch.length; i++){
                tree.push(node.ch[i]);
            }
        }
    },
};

/*
* 这里存放二叉树生成算法
* */
T.generateFn = {

    /*
    * 随机树
    * */
    randomTree: function () {
        let root = {ch: []}
        let r = 0;
        let c = (o)=>{
            if (Math.random() < r) return false;
            r += .2;
            for (let i = 0; i < Math.random()*5; i++) {
                let f = {ch: []}; o.ch.push(f); c(f);
            }
        }
        c(root);
        return root;
    },

    /*
    * 随机二叉树
    * */
    randomBinaryTree: function () {
        let root = {ch: []}
        let r = 0;
        let c = (o)=>{
            if (Math.random() < r) return false;
            r += .1;
            for (let i = 0; i < Math.random()*2; i++) {
                let f = {ch: []}; o.ch.push(f); c(f);
            }
        }
        c(root);
        return root;
    },

    /*
    * 完全二叉树
    * */
    completeBinaryTree: function () {
        let root = {ch: [], la: 1}
        let g = (o)=>{
            if (o.la >= 5) return;
            for (let i = 0; i < 2; i++) {
                let f = {ch: [], la: o.la + 1}; o.ch.push(f); g(f);
            }
        }
        g(root);
        return root;
    },

    /*
    * 只有根节点
    * */
    onlyNode: function () {
        return {ch: []}
    }
}