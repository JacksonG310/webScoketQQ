<template>
    <div id="login">
        <top-bar :padding="true" @click-left="handleLeft" @click-right="handleRight">
            <template slot="left">
                <van-icon name="arrow-left" />
            </template>
            <template slot="right">
                注册
            </template>
        </top-bar>
        <div class="main">
          <div class="logo">
            <img src="../assets/images/login&register/QQ.png" alt="">
          </div>
          <div class="form-field">
            <div class="title">
              <h3>登录</h3>
              <div class="welcome">
                欢迎加入信科QQ2022
              </div>
            </div>
            <van-form>
              <van-field name="usename" label="用户名/邮箱" placeholder="用户名/邮箱"></van-field>
              <van-field name="password" label="密码" placeholder="密码"></van-field>
            </van-form>
            <van-button class="login-button" round block type="info" native-type="submit">提交</van-button>
          </div>
        </div>
    </div>

</template>

<script>
import TopBar from "../components/Common/top-bar.vue"
export default {
    components: { TopBar },
    data() {
        return {

        }
    },
    methods: {
        handleLeft() {
            console.log("left");
        },
        handleRight() {
            console.log("right");
        }
    }
}
</script>

<style lang="less" scoped>
#login{

    min-height: 3000px;
    margin-top: .88rem;
    .main{
      padding: 0 @less-spacing-row-28;
      .logo{
        margin-top: 1rem;
        text-align: center;
        img{
          width: 4rem;
          height: 4rem;
        }
      }
      .form-field{
        .title{
          h3{
            font-size: @less-text-size-28  /* 28/50 */;
          }
          .welcome{
            font-size: @less-text-size-20;
            color: #94959a;
          }
        }
        .van-form{
          font-size: @less-text-size-18;
          margin-top: 0.28rem  /* 14/50 */;
          .van-field{
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
        .login-button{
          background-color: @less-background-color-enable;
          color: @less-text-color;
          border: none;
          margin-top: 0.4rem  /* 20/50 */;
        }

      }
    }

}
</style>