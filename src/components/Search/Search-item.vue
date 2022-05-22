<template>
    <div id="search-item">
        <div class="profile">
            <slot></slot>
        </div>
        <div class="name" v-html="name"></div>
        <div class="operation">
            <button v-if="type == 'user' && !isFriend">加好友</button>
            <button v-else-if="type == 'group' && !isMember">加群聊</button>
            <button v-else class="send-botton">发消息</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        name:{
            type:String,
            default:"",
        },
        isFriend:{
            type:Boolean,
            default:false,
        },
        isMember:{
            type:Boolean,
            default:true,
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
    .name{
        flex: 1;
        padding: 0 @less-spacing-row-16;
        font-size: @less-text-size-18;
    }
    .operation{
        width: 1.2rem;
        display: flex;
        align-items: center;
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