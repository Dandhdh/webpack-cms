<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>

        <textarea placeholder="请输入要评论的内容... (最多120字)"
        maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <!-- 展示评论的区域 -->
        <!-- 暂时无法获取评论数据，只能用下面的伪造数据 -->
        <!--<div class="cmt-list">-->
            <!--<div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">-->
                <!--<div class="cmt-title">-->
                    <!--&nbsp;第{{i+1}}楼&nbsp;&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;&nbsp;-->
                    <!--发表时间：{{ item.add_time | dateFormat }}-->
                <!--</div>-->
                <!--<div class="cmt-body">-->
                    <!--{{ item.content === 'undefined' ? '此用户很懒，什么也没说。' : item.content }}-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    &nbsp;第1楼&nbsp;&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;&nbsp;发表时间：8102-12-28 18:09:00
                </div>
                <div class="cmt-body">
                    真的不错，好评
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large">加载评论</mt-button>


    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "comment",
        data(){
            return {
                pageIndex:1,   // 默认展示第一页数据
                comments:[],   // 所有评论数据
            };
        },
        created(){
            this.getComments()
        },
        methods: {
            getComments(){
                this.$http.get('api/getcomments/' + this.id +
                    '?pageIndex=' +this.pageIndex).then(result => {
                        if (result.body.status === 0){
                            // this.comments = result.body.message;
                            // 每当获取新评论数据的时候，不要把老评论数据清空覆盖，而是拼接上新的数据
                            this.comments = this.comments.concat(result.body.message)
                        }else {
                            Toast('获取评论失败')
                        }
                })
            },
            getMore(){
                // 加载更多
                this.pageIndex++;
                this.getComments()
            }
        }
    }
</script>

<style scoped lang="scss">
    .cmt-container{
        h3{
            font-size: 16px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0px;
        }
        .cmt-list{
            margin: 10px 0px;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>