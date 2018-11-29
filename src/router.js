import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbat/Home-Container.vue'
import MemberContainer from './components/tabbat/Member-Container.vue'
import SearchContainer from './components/tabbat/Search-Container.vue'
import ShopcarContainer from './components/tabbat/Shopcar-Container.vue'

// 创建路由对象
var router = new VueRouter({

    routes: [    // 匹配路由对象
        {path:'/', redirect:'/home'},
        {path: '/home', component:HomeContainer},
        {path: '/member', component:MemberContainer},
        {path: '/search', component:SearchContainer},
        {path: '/shopcar', component:ShopcarContainer},
    ],
    // 覆盖默认的路由高亮的类
    // 即使用 'mui-active' 覆盖默认的高亮的类 'router-link-active'
    linkActiveClass:'mui-active'  // 这个值主要看mui里面的高亮类
})

// 把路由对象暴露出去
export default router