<template>
    <div id="friendDetail">
        <top-bar :padding="true">
            <template slot="left">
                <van-icon name="arrow-left" size=".48remm"/>
            </template>
            <template slot="right">
                <van-icon name="ellipsis" szie=".48rem"/>
            </template>
        </top-bar>
        <div class="main">
            <div class="profile">
                <img src="../assets/images/index/profile-03.jpeg" alt="profile">
                <i class="sex-tag"></i>
            </div>
            <div class="name">大螃蟹咯咯</div>
            <div class="sign">
                <p class="content">
                    夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席整片旷野，撩动人的思绪万千。
                </p>
            </div>
            <div class="be-friend-box">
                <van-button class="be-friend-button" type="primary" block>加为好友</van-button>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
export default {
    components:{TopBar}
}
</script>

<style lang="less">
    #friendDetail{
        position: relative;
        z-index: -99;
        width: 100%;
        height: 100vh;
        background: url("../assets/images/index/profile-03.jpeg") no-repeat;
        background-position: center center;
        #top-bar{
            background-color: transparent !important;    
        }
        .main{
            padding-top: .88rem;
            .profile{
                position: relative;
                text-align: center;
                margin-top: .6rem;
                img{
                    width: 4rem;
                    height: 4rem;
                    border: .06rem solid #fff;
                    border-radius: .48rem;
                }
                .sex-tag{
                    position: absolute;
                    left: 4.76rem;
                    bottom: .48rem;
                    width: .64rem;
                    height: .64rem;
                    border-radius: 50%;
                    background-color: #ff5d5b;
                }
            }
            .name{
                margin-top: .48rem;
                font-size: @less-text-size-26;
                font-weight: 400;
                text-align: center;
            }
            .sign{
                margin-top: .2rem;
                text-align: center;
                .content{
                    display: inline-block;
                    width: 5.52rem;
                    height: 1.7rem;
                    line-height: .5rem;
                    font-size: @less-text-size-14;
                }
            }
            .be-friend-box{
                position: absolute;
                width: 100%;
                bottom: .76rem;
                padding: 0 @less-spacing-row-16;
                .be-friend-button{
                    width: 100%;
                    height: .8rem;
                    border: none;
                    background-color: @less-background-color-enable;
                }
            }
        }
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background-color: rgba(255, 255, 255, .6);
            backdrop-filter:blur(.24rem);
        }
    }
</style>