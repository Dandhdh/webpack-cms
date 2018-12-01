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
            <router-link class="mui-tab-item-llb" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">

    .mint-header{
        z-index: 99;   // 设置最大的优先级，防止之后的图片列表上滑会被覆盖
    }

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

    // 改类名， 解决tabbar 点击无法切换的问题
    // 原因是 类名mui-tab-item，与滑动条导入的mui里面的类名冲突

    // 在源码分析中，找到所有含有 类mui-tab-item的样式，复制下来，
    // 再将 类名改成：mui-tab-item-llb，
    // 之后 这里的 template里面，使用 mui-tab-item-llb 代替原来的 mui-tab-item

    .mui-bar-tab .mui-tab-item-llb.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>