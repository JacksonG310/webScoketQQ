<template>
    <div id="chat">
        <top-bar :padding="true" title="开心就好">
            <template slot="left">
                <van-icon name="arrow-left" />
            </template>
            <template slot="right">
                <img class="friend-profile" :src="require(`../assets/images/list-item/profile-01.jpeg`)" alt="friend-profile">
            </template>
        </top-bar>
        <div class="main">
            <Dialog v-for="i in 10" :direction=" i % 2 == 1 ? 'left' : 'right'" >
                <template slot="profile">
                    <img :src="require(`../assets/images/list-item/profile-01.jpeg`)" alt="">
                </template>
                <template slot="content">
                     开发的，啥可大可久多久的开发
                     上课地方，是的开发绿色健康。
                     上课地方叫来，都看见。
                     <!-- <img src="../assets/images/list-item/profile-04.jpeg" alt=""> -->
                </template>
            </Dialog>
            <div class="footer">
                <div class="left">
                    <van-icon name="volume-o" size=".56rem"/>
                </div>
                <div class="center">
                    <textarea class="input-box" name="input" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="right">
                    <van-button type="primary" class="send-message">发送</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
import Dialog from "../components/Chat/Dialog-balloon.vue"
export default {
    components:{TopBar,Dialog}
}
</script>

<style lang="less">
    #chat{
        min-height: 100%;
        background-color: #f4f4f4;
        padding-bottom: 1.2rem;
        #top-bar{
            background-color: #f4f4f4 !important;
            border-bottom: 1px solid #ccc;
        }
        .main{
            overflow: scroll;
            min-height: 100vh;
            height: auto;
            padding-top: .88rem;
        }
        .footer{
            display: flex;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .98rem;
            padding: 0 @less-spacing-row-16;
            background-color: #f4f4f4;
            border-top: 1px solid #ccc;
            .left{
                vertical-align: top;
                text-align: center;
                padding-top: .24rem;
                .van-icon{
                    vertical-align: top;
                }
            }
            .center{
                padding: .14rem @less-spacing-row-10;
               .input-box{
                   vertical-align: top;
                   font-size: @less-text-size-16;
                   border: none;
                   padding: .16rem;
                   border-radius: .1rem;
                    max-width: 4.8rem;
                    height: .72rem;
               }
            }
            .right{
                padding-top: .14rem;
                .send-message{
                    vertical-align: top;
                    width: 1.36rem;
                    height: .72rem;
                    border: none;
                    color:@less-text-color;
                    background-color: @less-background-color-enable;
                }
            }
        }
    }
</style>