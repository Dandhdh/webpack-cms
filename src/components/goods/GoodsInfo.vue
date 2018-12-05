<template>
    <div class="goodsinfo-container">

        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>


        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品的名称标题</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>¥ 2399</del>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span class="now_price">¥ 2199</span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectedCount"
                     :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small"
                          @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车时候，拿到 选择的数量值
                        1、经分析发现：按钮属于 goodsinfo 页面，数字属于 numerbox 组件
                        2、由于设计父子组件的嵌套，所以无法直接在 goodsinfo 中获取到选中的商品商品数量值
                        3、怎么解决？设计到子组件向父组件传值（事件调用机制）
                        4、事件调用的本质：父向子传递方法，子调用这个方法，并把数据当作参数，传递给这个方法
                        -->
                    </p>
                </div>
            </div>
        </div>
        <!-- 将请求得到的商品数据渲染到页面中 -->
        <!--<div class="mui-card">-->
            <!--<div class="mui-card-header">{{ goodsinfo.title }}</div>-->
            <!--<div class="mui-card-content">-->
                <!--<div class="mui-card-content-inner">-->
                    <!--<p class="price">-->
                        <!--市场价：<del>¥ {{ goodsinfo.market_price }}</del>-->
                        <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                        <!--销售价：<span class="now_price">¥ {{ goodsinfo.sell_price }}</span>-->
                    <!--</p>-->
                    <!--<p>购买数量：<numbox></numbox></p>-->
                    <!--<p>-->
                        <!--<mt-button type="primary" size="small">立即购买</mt-button>-->
                        <!--<mt-button type="danger" size="small">加入购物车</mt-button>-->
                    <!--</p>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：214598609853234242</p>
                    <p>库存情况：100 件</p>
                    <p>上架时间：2018-12-03 12:00:00</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain="" @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain="" @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
        <!--<div class="mui-card">-->
            <!--<div class="mui-card-header">商品参数</div>-->
            <!--<div class="mui-card-content">-->
                <!--<div class="mui-card-content-inner">-->
                    <!--<p>商品货号：{{ goodsinfo.goods_no }}</p>-->
                    <!--<p>库存情况：{{ goodsinfo.stock_quantity }}件</p>-->
                    <!--<p>上架时间：{{ goodsinfo.add_time |  dateFormat }}</p>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="mui-card-footer">-->
                <!--<mt-button type="primary" size="large" plain="">图文介绍</mt-button>-->
                <!--<mt-button type="danger" size="large" plain="">商品评论</mt-button>-->
            <!--</div>-->
        <!--</div>-->

    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    // 导入 数字选择框组件
    import numbox from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        name: "GoodsInfo",
        data(){
            return {
                id: this.$route.params.id,
                lunbotu:[],  // 轮播图的数据
                goodsinfo:{},  // 获取到的商品的信息
                ballFlag: false,   // 控制小球隐藏和显示的标识符
                selectedCount: 1,  // 保存用户选中的商品数量
            }
        },
        created(){
            this.getLunbotu();
            this.getGoodsINfo()
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0){
                        /**
                         * 先循环轮播图数组的每一项，为item添加img属性
                         * 只认识item.img，不认识item.src
                         */
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        })
                        this.lunbotu = result.body.message;
                    }
                })
            },
            getGoodsINfo(){
                // 获取商品的信息
                this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                    if (result.body.status === 0){
                        this.goodsinfo = result.body.message[0]
                    }
                })
            },
            goDesc(id){
                // 点击使用编程式导航转跳到 图文介绍页面
                this.$router.push({name:'goodsdesc', params:{id} })
            },
            goComment(id){
                // 点击跳转到 评论页面
                this.$router.push({name:'goodscomment', params: {id} })
            },
            addToShopCar(){
                // 添加到购物车
                this.ballFlag = !this.ballFlag
                // {id:商品的id，count:要购买的数量，price:商品的单价，selected：商品在购物车中是否被选中}
                // 拼接出一个，要保存到store中car数组里的商品信息的对象
                // var goodsinfo = {
                //     id: this.id,
                //     count:this.selectedCount,
                //     price:this.goodsinfo.sell_price,
                //     selected:true
                // }

                // 伪造一个商品数据
                var goodsId = this.$route.params.id;
                var goodsinfo = '';
                if (goodsId === '1'){
                    goodsinfo = {id: 1,count:this.selectedCount, sell_price:2199, selected:true,
                        title:'oppo find X 玫红色 16G双网通版',
                        thumb_path:'https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg'};
                }else if (goodsId == '2') {
                    goodsinfo = {id: 2,count:this.selectedCount, sell_price:5999, selected:true,
                        title:'Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机',
                        thumb_path:'https://img14.360buyimg.com/n0/jfs/t10675/253/1344769770/66891/92d54ca4/59df2e7fN86c99a27.jpg'};
                }else {
                    goodsinfo = {id: 3,count:this.selectedCount, sell_price:3388, selected:true,
                        title:'华为 HUAWEI P20 AI智慧徕卡双摄全面屏游戏手机 6GB+64GB 极光色 双卡双待',
                        thumb_path:'https://img14.360buyimg.com/n0/jfs/t18052/318/2334327001/256076/23da5f45/5af13917Naca6cb3d.jpg'};
                }

                // 调用 store 中的 mutations 来将商品加入购物车
                this.$store.commit("addToCar",goodsinfo);

            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)"
            },
            enter(el,done){
                el.offsetWidth;

                /**
                 * 小球动画优化思路：
                 * 1、先分析导致 动画不准确的本质原因：
                 *    我们把小球最终位移到的位置，已经局限到某一分辨率下的 滚动条未滚动的情况下；
                 * 2、只要分辨率 和测试时候的不一样，或者滚动条有滚动之后，问题就显示出来
                 * 3、得出结论：不能把 位置的横纵坐标 直接写死，而是应该根据不同情况，动态计算这个坐标值
                 * 4、经过分析，得出解题思路：
                 *    先得到徽标的 横纵坐标，再得到小球的横纵坐标，
                 *    然后分别让 y值 和 x值 求差，得到结果，就是要位移的距离
                 * 5、如果获得 徽标和小球的位置？
                 *    domObject.getBoundingClientRect()
                 */

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取徽标在页面中的位置
                const badgePosition = document
                    .getElementById('badge')
                    .getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                // 注意：这个值的两个引号是 ``， 而不是''
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count){
                // 当子组件 把选中的数量传递给父组件俺的时候，把选中的值挂载到 data 上
                this.selectedCount = count;
                console.log('父组件拿到的数量值：'+this.selectedCount)
            }
        },
        components:{
            swiper,numbox
        }
    }
</script>

<style scoped lang="scss">
    .goodsinfo-container{
        background-color: #eeeeee;
        overflow: hidden;

        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }

        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 392px;
            left: 149px;
            //transform: translate(90px, 431px);

        }
    }

</style>