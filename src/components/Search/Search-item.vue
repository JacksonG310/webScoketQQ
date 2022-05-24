<template>
    <div id="search-item">
        <div class="profile">
            <img :src="require(`../../assets/images/list-item/${res.profile}`)" alt="profile">
        </div>
        <div class="info">
            <div class="name" v-html="res.name"></div>
            <div class="email"><span>邮箱：</span><span  v-html="res.email"></span></div>
        </div>
        <div class="operation">
            <!-- <button v-if="type == 'user' && !res.isFriend"><router-link :to="`/friendDetail?friendID=${res.id}`">加好友</router-link></button> -->
            <button v-if="type == 'user' && !res.isFriend">加好友</button>
            <button v-else-if="type == 'group' && !isMember">加群聊</button>
            <button v-else class="send-botton">发消息</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        res:{
            type:Object
        },
        isMember:{
            type:Boolean,
            default:false
        },
        type:{
            type:String,
            default:'user'
        }
    },
    created() {
    },
}
</script>

<style scoped lang="less">
#search-item{
    // background-color: pink;
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    .profile{
        width: .8rem;
        img{
            width: 100%;
            border-radius: .2rem;
        }
    }
    .info{
        padding: 0 @less-spacing-row-16;
        flex: 1;
        .name{
            font-size: @less-text-size-18;
        }
            .email{
            font-size: @less-text-size-12;
        }
    }
    .operation{
        width: 1.2rem;
        display: flex;
        align-items: center;
        a{
            color: #abd8ff;
        }
        button{
            width: 1.2rem;
            height: .48rem;
            border: 0;
            font-size: @less-text-size-12;
            background-color: #edf7ff;
            border-radius: .24rem;
            color: #abd8ff;
        }
        .send-botton{
            background-color: @less-background-color-enable;
            color: @less-text-color;
        }
    }
}
</style>