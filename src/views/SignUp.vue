<template>
    <div id="signUp">
      <top-bar :padding="true" >
        <template slot="left">
          <van-icon name="arrow-left" />
        </template>
        <template slot="right">
          <van-icon name="cross" />
        </template>
      </top-bar>
        <div class="main">
            <div class="logo">
                <img src="../assets/images/login&register/QQ.png" alt="">
            </div>
          <div class="form-field">
            <div class="title">
              <h3>注册</h3>
            </div>
            <van-form>
              <van-field name="username" label="用户名" placeholder="请输入用户名"></van-field>
              <van-field name="email" label="邮箱" placeholder="请输入邮箱"></van-field>
              <van-field name="password" label="密码" placeholder="请输入密码"></van-field>
              <van-field name="again" label="确认密码" placeholder="请再次输入密码"></van-field>
            </van-form>
              <van-button class="signUp-button disable" round block type="info" native-type="submit">提交</van-button>
          </div>
        </div>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
export default {
  components:{ TopBar },
    data() {
        return {

        }
    },
    methods: {


    },
    computed: {

    }
}
</script>

<style lang="less" scoped>
#signUp {
    width: 100%;
    min-height: 100vh;
    .main {
      margin-top: @less-spacing-col-44;
        padding: 0 @less-spacing-row-28;
      .logo{
        margin-top: 1rem;
        text-align: center;
        img{
          width: 4rem;
          height: 4rem;
        }
      }
      .title{
        font-size: @less-text-size-28;
      }
      .signUp-button{
        border:none;
        margin-top: 0.2rem  /* 10/50 */;
        &.enable{
          background-color: @less-background-color-enable;
        }
        &.disable{
          background-color: @less-background-color-disabled;
        }


      }

    }

}
</style>