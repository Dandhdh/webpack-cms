import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/Home-Container.vue'
import MemberContainer from './components/tabbar/Member-Container.vue'
import SearchContainer from './components/tabbar/Search-Container.vue'
import ShopcarContainer from './components/tabbar/Shopcar-Container.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

// 创建路由对象
var router = new VueRouter({

    routes: [    // 匹配路由对象
        {path:'/', redirect:'/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/search', component: SearchContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/home/newsList', component: NewsList},
        {path: '/home/newsinfo/:id', component: NewsInfo}
    ],
    // 覆盖默认的路由高亮的类
    // 即使用 'mui-active' 覆盖默认的高亮的类 'router-link-active'
    linkActiveClass:'mui-active'  // 这个值主要看mui里面的高亮类
})

// 把路由对象暴露出去
export default router