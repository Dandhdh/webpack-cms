<template>
    <div>
        <ul class="mui-table-view">
            <!-- 渲染获取的新闻列表数据 -->
            <!--<li class="mui-table-view-cell mui-media" v-for="item in newslist"-->
                <!--:key="item.id">-->
                <!--<router-link :to="'/home/newsinfo/'+item.id">-->
                    <!--<img class="mui-media-object mui-pull-left" :src="item.img_url">-->
                    <!--<div class="mui-media-body">-->
                        <!--<h1>{{ item.title }}</h1>-->
                        <!--<p class='mui-ellipsis'>-->
                            <!--<span>发表时间：{{item.add_time | dateFormat() }}</span>-->
                            <!--<span>点击次数：{{item.click}}次</span>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</router-link>-->
            <!--</li>-->
            <li class="mui-table-view-cell mui-media">
                <router-link to="/home/newsinfo/1">
                    <img class="mui-media-object mui-pull-left" src="../../images/newsImages/cbd.jpg">
                    <div class="mui-media-body">
                        <h1>幸福</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：2018-12-12 12:12:12</span>
                            <span>点击次数：0次</span>
                        </p>
                    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/home/newsinfo/2">
                    <img class="mui-media-object mui-pull-left" src="../../images/newsImages/muwu.jpg">
                    <div class="mui-media-body">
                        <h1>木屋</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：2018-12-12 12:12:12</span>
                            <span>点击次数：0次</span>
                        </p>
                    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/home/newsinfo/3">
                    <img class="mui-media-object mui-pull-left" src="../../images/newsImages/shuijiao.jpg">
                    <div class="mui-media-body">
                        <h1>CBD</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：2018-12-12 12:12:12</span>
                            <span>点击次数：0次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "NewsList",
        data(){
            return {
                newslist:[]    // 新闻列表
            }
        },
        created(){
            // this.getNewsList();
        },
        methods:{
            getNewsList(){
                // 获取新闻列表信息
                this.$http.get('api/getnewslist').then(result => {
                    if (result.body.status === 0) {
                        // 如果没有失败，数据保存在data上
                        this.newslist = result.body.message;
                    }else {
                        Toast('获取新闻列表失败')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view{
        li{
            h1{
                font-size: 15px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color: lightseagreen;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>