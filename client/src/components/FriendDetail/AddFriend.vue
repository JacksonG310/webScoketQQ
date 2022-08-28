<template>
    <div id="addFriend" >
        <div class="name">{{firendName}}</div>
        <div class="message">
            <textarea class="textarea" maxlength="120" v-model="message"></textarea>
        </div>
        <div class="button-group">
            <van-button class="cancle" @click="closeDialog">取消</van-button>
            <van-button class="send" @click="handleClick">发送</van-button>
        </div>
    </div>
</template>

<script>
export default {
    props:['firendName'],
    data() {
        return {
            curUsername:"",
            isOpen:this.isClick,
            message:"",
        }
    },

    methods: {
        handleClick(){
            this.$emit('sendApply',this.message)
        },
        closeDialog(){
            this.$emit('closeDialog');
        }
    },
    created() {
        let curUser = window.localStorage.getItem('curUser');
        curUser = JSON.parse(curUser);
        this.curUsername = curUser.username;
        this.message = `我是${this.curUsername}`
    }
}
</script>

<style lang="less" scoped>
    #addFriend{
        transition: .5s ease-in-out all;
        position: absolute;
        width: 100%;
        padding-top: 1.68rem;
        padding-left: .6rem;
        padding-right: .6rem;
        box-shadow: 0 .36rem .4rem 0;
        border-radius: .4rem .4rem 0 0;
        background-color: #fff;
        .name{
            font-size: @less-text-size-26;
        }
        .message{
            width: 100%;
            height: 68.20%;
            padding-top: 4.6%;
            .textarea{
                width: 100%;
                height: 100%;
                font-size: @less-text-size-16;
                padding: .18rem .22rem;
                resize: none;
                border: none;
                background-color: #F3F4F6;
                border-radius: .2rem;
            }
        }
        .button-group{
            margin-top: 12.53%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .cancle{
                width: 1.72rem;
                height: .8rem;
                border: none;
                border-radius: .1rem;
                font-size: @less-text-size-16;
                background-color: #e9e9ea;
            }
            .send{
                height: .8rem;
                margin-left: @less-spacing-row-16;
                flex:1;
                border: .1rem;
                background-color: @less-background-color-enable;
            }
        }
    }
</style>