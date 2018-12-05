// 入口文件
import Vue from 'vue'
// 导入路由的包、并安装路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 每次刚进入网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，
// 把购物车的数据读取出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        // this.$store.state.*****

        /**
         * 将购物车中商品的数据，用一个数组存起来，在car数组中，存储一些商品的对象
         * 咱们可以暂时设计成这个商品对象
         * {id:商品的id，count:要购买的数量，price:商品的单价，selected：商品在购物车中是否被选中}
         */
        car:car,

    },
    mutations:{
        // this.$store.commit.('方法名称','按需传递唯一的参数')
        addToCar(state,goodsinfo){
            // 点击加入购物车，把商品信息，保存到state上
            /**
             * 分析：
             * 1、如果购物车中，之前就有这个对应的商品了，那么，只需要更新数量
             * 2、如果没有，则直接把 商品数据，push到car中即可
             */
            // 假设没有找到对应的商品
            var flag = false;
            state.car.some(item =>{
                if (item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            });
            if (!flag){
                state.car.push(goodsinfo)
            }

            // 当更新 car 之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo){
            // 修改购物车中商品的数量值
            state.car.some(item =>{
                if (item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }
            })

            // 当修改完商品的数量，把最新的数据，保存到本地储存中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            // 根据id，从 store 删除对应的数据
            state.car.some((item,i) => {
                if (item.id == id){
                    state.car.splice(i,1)
                    return true;
                }
            })

            // 将 store数据与本地存储的数据同步
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if (item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
    },
    getters:{
        // this.$store.getters.****
        // 相当于 计算属性，也相当于 filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item =>{
                c += item.count;
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,   // 勾选的数量
                amount:0,  // 勾选商品的总价
            }
            state.car.forEach(item => {
                if (item.selected){
                    o.count += item.count
                    o.amount += item.sell_price * item.count
                }
            })
            return o;
        }
    }
})

// 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 全局设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io';
// 全局设置 post 时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
import  MintUI from 'mint-ui';
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入自己的 router.js 路由模块
import router from './router.js'

// 导入app根组件
import app from './app.vue'

// 导入时间插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router ,   // 挂载路由对象到 vm 实例上
    store,     // 挂载状态管理对象
})