<template>
    <div class="goodsdesc-container">
        <h3>商品图文介绍页面</h3>
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content">
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsDesc",
        data(){
            return{
                info:{}   // 图文数据
            }
        },
        created(){
          this.getGoodsDesc()
        },
        methods:{
            getGoodsDesc(){
                this.$http
                    .get('api/goods/getdesc/'+ this.$route.params.id)
                    .then(result => {
                        if (result.body.status === 0){
                            this.info = result.body.message[0];
                        }
                    })
            }

        }
    }
</script>

<style scoped lang="scss">
    .goodsdesc-container{
        padding: 4px;
        h3 {
            font-size: 16px;
            color: lightslategray;
            text-align: center;
            margin: 15px;
        }
        .content {
            img{
                width: 100%;
            }
        }
    }

</style>