<template>
    <div id="friendDetail" >
        <top-bar :padding="true" ref="a">
            <template slot="left">
                <van-icon name="arrow-left" size=".48remm"/>
            </template>
            <template slot="right">
                <van-icon name="ellipsis" @click="readMore" szie=".48rem"/>
            </template>
        </top-bar>
        <div class="main">
            <div class="profile">
                <img 
                    :class="{'open':isOpen,'close':!isOpen}" 
                    :src="require(`../assets/images/list-item/${friendInfo.profile}`)" 
                    alt="profile">
                <!-- <i class="sex-tag" v-show="!isOpen"></i> -->
            </div>
            <div class="name">{{friendInfo.name}}</div>
            <div class="sign">
                <p class="content">
                   该用户很懒，什么都没写
                </p>
            </div>
            <div class="be-friend-box">
                <van-button v-if="isFriend == '1'" class="send-message-button" type="primary" block >发消息</van-button>
                <van-button v-else  class="be-friend-button" type="primary" block @click="isOpen = true">加为好友</van-button>
            </div>
        </div>
        <div class="bg"><img :src="require(`../assets/images/list-item/${friendInfo.profile}`)" alt="bg"></div>
        <div class="mask"></div>
            <add-friend
             :firendName="friendInfo.name"
             :style="{height: dialogHeight+'px' ,bottom: isOpen ? 0 : -1 * dialogHeight+'px'}" 
             @closeDialog="handleClose" @sendApply="sendApply"></add-friend>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
import AddFriend from "../components/FriendDetail/AddFriend"
import { Toast } from "vant"
export default {
    components:{TopBar,AddFriend},
    data(){
        return{
            viewPortHeight:0,
            dialogHeight:0,
            isOpen:false,
            curUserID:"",
            friendID:"",
            isFriend:"0",
            friendInfo:{},
        }
    },
    methods: {
       async sendApply(){
            let data = {
                uid:this.curUserID,
                fid:this.friendID,
                msg:this.message,
            }
            const {data:res} = await this.$http.post('/friend/friendApply',data);
            if(res.code === 20000){
                Toast.success('请求已发送');
                this.isOpen = false;
            }else{
                Toast.fail('请求发送失败,请重试');
            }
        },
        handleClose(){
            this.isOpen = false;
        },
        readMore(){
            this.$router.push({path:"/individual",query:{id:this.friendID}})
        }
    },
    async created() {
        this.friendID = this.$route.query.friendID;
        this.isFriend = this.$route.query.isFriend;
        this.curUserID = window.localStorage.getItem("curUserID");
        const {data:res} = await this.$http.get(`/userDetail?id=${this.friendID}`);
        if(res.code == 20000){
            this.friendInfo = res.data;
        }else{
            Toast.fail("获取用户信息失败");
        }
        console.log(this.friendInfo);
    },
    mounted() {
        this.viewPortHeight = document.documentElement.clientHeight;
        this.dialogHeight = this.viewPortHeight - 186;
    },
}
</script>

<style lang="less">
    #friendDetail{
        overflow: hidden;
        position: relative;
        z-index: 12;
        width: 100%;
        height: 100vh;
        #top-bar{
            background-color: transparent !important;    
        }
        .main{
            padding-top: .88rem;
            .profile{
                width: 100%;
                height: 4.2666rem;
                position: relative;
                text-align: center;
                margin-top: .6rem;
                img{
                    position: absolute;
                    z-index: 99;
                    border: .06rem solid #fff;
                    transition: .5s ease-in-out all;
                }
                .sex-tag{
                    position: absolute;
                    z-index: 99;
                    left: 4.9rem;
                    bottom: .48rem;
                    width: .64rem;
                    height: .64rem;
                    border-radius: 50%;
                    background-color: #ff5d5b;
                    transition: .5s ease-in-out all;

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
                .be-friend-button,
                .send-message-button{
                    width: 100%;
                    height: .8rem;
                    border: none;
                    color: @less-text-color;
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
        .bg{
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                // transform: translateX(25%);
            }
        }
    }
    .open{
        width: 2.4rem;
        height: 2.4rem;
        top: 1rem;
        border-radius: 50%;
        left: .6rem
    }
    .close{
        left: 1.74rem;
        width: 4rem;
        height: 4rem;
        border-radius: .48rem;
    }
</style>