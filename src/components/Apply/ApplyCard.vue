<template>
    <div id="applyCard">
        <div class="profile"><img src="../../assets/images/list-item/user.png" alt="profile"></div>
        <div class="button-group">
            <button class="refuse-button">拒绝</button>
            <button class="agree-button">同意</button>
        </div>
        <div class="info">
            <p class="name">即时客观</p>
            <p class="apply-time">2020-05-11</p>
        </div>
        <div class="message">
            留言:你好请通过我的好友神器哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    #applyCard{
        position: relative;
        margin-bottom: 1rem;
        padding: .32rem;
        width: 100%;
        height: 3.88rem;
        background-color: #fff;
        box-shadow: 0 .24rem .64rem -0.08rem rgba(0, 0, 0, .1);
        border-radius: .2rem;
        .profile{
            position: absolute;
            width: 1.44rem;
            height: 1.44rem;
            left: 50%;
            top: -0.64rem;
            transform: translateX(-50%);
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
        .button-group{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .refuse-button,.agree-button{
                width: 1.6rem;
                height: .64rem;
                font-size: @less-text-size-16;
                border: none;
                border-radius: .4rem;
            }
            .refuse-button{
                background-color: #ffeff0;
            }
            .agree-button{
                background-color: @less-background-color-enable;
            }
        }
        .info{
            width: 100%;
            text-align: center;
            padding-top: .2rem;
            .name{
                font-size: @less-text-size-18;
                font-weight: 500;
            }
            .apply-time{
                font-size: @less-text-size-12;
                color:rgba(39, 40, 50, .4);
            }
        }
        .message{
            font-size: .32rem;
            margin-top: .32rem;
            width: 100%;
            padding: .2rem .32rem;
            background-color: #f4f5f7;
            border-radius: .2rem;
        }
    }
</style>