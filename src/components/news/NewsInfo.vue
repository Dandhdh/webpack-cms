<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo.click }}次 </span>
        </p>
        <hr>

        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论区域 -->
        <comment-box></comment-box>
    </div>
</template>

<script>

    import comment from '../subcomponents/comment.vue'

    export default {
        name: "NewsInfo",
        data(){
            return {
                id: this.$route.params.id,  // 将url传递过来的id值，挂载到data上，方便调用
                newsinfo : {}
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                // 获取新闻详情
                this.$http.get('api/getnew/'+this.id).then(result => {
                    if (result.body.status === 0){
                        this.newsinfo = result.body.message[0]
                    } else {
                        Toast('获取新闻失败')
                    }
                })
            }
        },
        components:{
            // 用来注册子组件的节点
            'comment-box': comment
        }
    }
</script>

<!--
  注意：要去掉这里的 scoped，下面配置的
  img{
       width: 100%;
  }
  才会生效，

  注意，这样并不会导致全局污染，
  因为的下面的样式都是根据 class='newsinfo-container'设置的，
  而这个是全局唯一的
-->
<style lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: lightseagreen;
        }
        .subtitle{
            font-size: 12px;
            color: lightslategrey;
            display: flex;
            justify-content: space-between;
        }
        .content {
            img{
                // 设置新闻内容中图片的样式
                width: 100%;
            }
        }
    }
</style>