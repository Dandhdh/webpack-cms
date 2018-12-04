<template>
    <div>
        <!-- 轮播图组件 -->
        <!-- 将来，谁使用 轮播图组件，谁为我们传递 lunbotuList
             此时，lunbotuList 应该是 父组件 向子组件传值来设置
        -->

        <mt-swipe :auto="3000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
            <mt-swipe-item>4</mt-swipe-item>

            <!-- 由于现在无法获取数据，先注释 -->
            <!-- 在组件中，使用v-for循环的话，一定要使用key -->
            <!--<mt-swipe-item v-for="item in lunbotuList" :key="item.url">-->
               <!--<img :src="item.img" alt="" :class="{'ifull': isfull}">-->
            <!--</mt-swipe-item>-->
        </mt-swipe>
    </div>

    <!--
     分析：为什么商品评论中的 轮播图那么丑
     1、首页中的图片，它的宽和高，都是使用了 100% 的宽度
     2、商品详情的页面中，轮播图的 图片，如果也使用 宽高为 100%的话，页面不好看
     3、商品详情页面中的轮播图，期望 高度是 100%，但是宽度为自适应
     4、经过分析，得到问题的原因是：
           首页中的轮播图 和 详情中的轮播图，分歧点是：宽度是自适应，还是100%
           既然，两个 轮播图，其他方面都是没有冲突的，只是宽度有分歧，那么我们可以定义一个属性，
           让使用轮播图的 调用者，手动指定时候为 100%的宽度
     -->
</template>

<script>
    export default {
        name: "swiper",
        props: ["lunbotuList", "isfull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            &:nth-child(1){
                background-color: lightcoral;
            }
            &:nth-child(2){
                background-color: lightblue;
            }
            &:nth-child(3){
                background-color: lightgreen;
            }
            &:nth-child(4){
                background-color: lightsalmon;
            }
            img{
                // width: 100%;
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
    }

</style>