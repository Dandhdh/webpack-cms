<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击次数：{{ photoinfo.click }}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <!-- TODO -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list"
                 :src="item.src" height="100" @click="$preview.open(index,list)"
                 :key="item.src">
        </div>


        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 防止一个现成的 评论子组件 -->
        <cmt-box></cmt-box>


    </div>
</template>

<script>
    // 导入评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "PhotoInfo",
        data(){
            return {
                id:this.$route.params.id,   // 从路由获取到的图片id
                photoinfo: {},   // 图片详情
                list:[]          // 缩略图的数组
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            getPhotoInfo(){
                // 获取图片的详情
                this.$http.get('api/getimageInfo/'+ this.id).then(result => {
                    if (result.body.status === 0){
                        this.photoinfo = result.body.message
                    }
                })
            },
            getThumbs(){
                // 获取缩略图
                this.$http.get('api/gettumimages/' + this.id).then(result => {
                    if (result.body.status === 0){
                        // 循环每个图片的数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        // 把完整的数据保存到 list 中
                        this.list = result.body.message;
                    }
                })
            }
        },
        components:{   // 注册组件
            'cmt-box': comment
        }
    }
</script>

<style scoped lang="scss">
    .photoinfo-container{
        padding: 3px;
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align:  center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }

</style>