<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
             alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">¥3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img14.360buyimg.com/n0/jfs/t23167/95/285071867/94556/c98fa4f6/5b2b6212N106d8382.jpg"
                 alt="" />
            <h1 class="title">小米(Mi)小米Note 16G 双网通版,速来抢购啦，卖完即止</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ 2199</span>
                    <span class="old">¥ 3199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsList"
    }
</script>

<style scoped lang="scss">
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;

        .goods-item{
            width: 49%;
            border: 1px solid #CCCCCC;
            box-shadow: 0 0 8px #CCCCCC;
            margin: 4px 0px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eeeeee;
                p{
                    margin: 0px;
                    padding: 5px ;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }

</style>