<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <!-- 商品列表区 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch class="selected-button"
                                   v-model="$store.getters.getGoodsSelected[item.id]"
                                   @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.thumb_path"/>
                        <div class="info">
                            <h1 >{{ item.title }}</h1>
                            <p>
                                <span class="price">¥ {{ item.sell_price }}</span>
                                <!-- 问题：如何从购物车获取商品的数量？
                                     1、我们可以先创建一个空对象，然后循环购物车中所有商品的数据，
                                     然后把当前循环的商品的id作为属性名，购物数量作为属性值，
                                     这样把所有商品遍历一遍，就会得到一个对象{1:2,2:5,4:7}

                                 -->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- remove(item.id, i)，item.id是为了删除store的数据，i是为了删除goodslist的数据  -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner paymoney">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red"> {{ $store.getters.getGoodsCountAndAmount.count }} </span>件，
                                总价<span class="red"> ¥ {{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'

    export default {
        name: "Shopcar-Container",
        data(){
            return {
                goodslist:[]    // 购物车所有商品的数据
            }
        },
        created(){
            this.getGoodsList();
            if (this.goodslist.length<=0) {
                JSON.parse(localStorage.getItem('car')).forEach(item => {
                    console.log(item);
                    this.goodslist.push(item);
                })
            }
        },
        methods:{
            getGoodsList(){
                // 1、获取到 store 中所有商品的ID，然后拼接出一个逗号分隔的字符串
                var idArr = [];
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id)
                })
                // 如果购物车没有商品，则直接返回，不需要数据接口，否则报错
                if (idArr.length <= 0){
                    return;
                }
                // 获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
                    .then(result => {
                        if (result.body.status === 0){
                            this.goodslist = result.body.message;
                        }
                    });
            },
            remove(id, index){
                // 把商品从 store 根据传递的id 删除
                // 同时，把当前组件中的 goodslist 的相应数据也删除，使用index来删除
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCar',id);
            },
            selectedChanged(id, val){
                // 每当点击开关，把最新的状态同步到store中
                this.$store.commit('updateGoodsSelected',{
                    id:id, selected:val
                })
            }
        },
        components:{
            numbox
        }
    }
</script>

<style scoped lang="scss">
    .shopcar-container{
        background-color: #eeeeee;
        overflow: hidden;

        .goods-list{
            .selected-button{
            }
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }

        .paymoney{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>