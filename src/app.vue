<template>
    <div class="app-container">
        <!-- 顶部 header 区域 -->
        <mt-header fixed title="我的主页"></mt-header>

        <!-- 中间路由 router-view 区域-->
        <transition>
            <router-view></router-view>
        </transition>

        <!-- 底部 tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .app-container {
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;  // 注意：实现在页面在左右跳动时的连接
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        /**
        实现在同时退出和进入时，在同一个位置，
        而不是，上面的在退出，进来的从下面进来，再移动上面
         */
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }
</style>