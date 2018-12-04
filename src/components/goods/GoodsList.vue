<template>
    <div class="goods-list">

        <!--<div class="goods-item" v-for="item in goodslist" :key="item.id">-->
            <!--<img :src="item.img_url" alt="">-->
            <!--<h1 class="title">{{ item.title }}</h1>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">¥ {{ item.sell_price }}</span>-->
                    <!--<span class="old">¥ {{ item.market_price }}</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩{{ stock_quanlity }}件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</div>-->

        <!--
         网页中有两种跳转方式：
         方式一：使用 a标签 的形式，叫 标签跳转
         方式二：使用 window.location.href 的形式，叫 编程式导航
         -->
        <!-- 标签跳转 -->
        <router-link class="goods-item" to="/home/goodsinfo/1">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </router-link>
        <!-- 编程式导航     本应写成 @click="getDetail(item.id)-->
        <div class="goods-item" @click="getDetail(1)">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版,速来抢购啦，卖完即止</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ 2199</span>
                    <span class="old">¥ 3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多图片</mt-button>

    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data(){
            // data 是往自己组件内部，挂载一些私有数据的
            return {
                pageindex:1,      // 分页的页数，默认为1
                goodslist:[],     // 存放商品列表的数组
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                // 获取商品列表
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                    if (result.body.status === 0){
                        // this.goodslist = result.body.message;
                        this.goodslist = this.goodslist.concat(result.body.message)
                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            },
            getDetail(id){
                // 使用JS的形式进行路由导航

                /**
                 * 注意：一定要区分 this.$route 和 this.$router 这个对象
                 * 其中，
                 * this.$route 是【路由参数对象】，所有 路由中的参数，params，query 都属于它
                 * this.$router 是【路由导航对象】，
                 *              用它 可以方便地 使用JS代码，实现前进、后退、转跳到新的url地址
                 */
                // 1. 最简单的
                // this.$router.push('/home/goodsinfo/'+id);
                // 2. 传递对象
                // this.$router.push({path:'/home/goodsinfo/'+id})
                // 3. 传递命名的路由   这里的name，在route.js的路由规则配置的可以设定
                this.$router.push({name:'goodsinfo', params:{id} })
                // 4.
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;

        .goods-item{
            width: 49%;
            border: 1px solid #CCCCCC;
            box-shadow: 0 0 8px #CCCCCC;
            margin: 4px 0px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eeeeee;
                p{
                    margin: 0px;
                    padding: 5px ;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }

</style>