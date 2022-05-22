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
            <van-form ref="loginForm">
              <van-field name="username" :rules="loginFormRules.data" v-model="loginForm.data" label="用户名/邮箱" placeholder="用户名/邮箱"></van-field>
              <van-field name="password" :rules="loginFormRules.password" v-model="loginForm.password" label="密码" placeholder="密码"></van-field>
            </van-form>
            <van-button class="login-button" round block type="info" native-type="submit" @click="doLogin">提交</van-button>
          </div>
        </div>
    </div>

</template>

<script>
import { Toast } from "vant"
import TopBar from "../components/Common/top-bar"
export default {
    components: { TopBar },
    data() {
        return {
          loginForm:{
            data:"",
            password:""
          },
          loginFormRules:{
            data:[{required:true,message:'请输入用户名或邮箱'}],
            password:[{required:true,message:'请输入密码'}]
          }
        }
    },
    methods: {
      //登录
        doLogin(){
          this.$refs.loginForm.validate().then(async ()=>{
            Toast.loading({
              message:'登录中...',
              forbidClick:true,
            })
            const {data:res} = await this.$http.post("/login",{loginForm:this.loginForm});
            console.log(res);
            if(res.code === 20000){
              Toast.success('登录成功');
              // 存储Token和头像
              window.localStorage.setItem('QQToken',res.data.token);
              window.sessionStorage.setItem(`profile-${res.data.id}`,res.data.profile);
              this.$router.push({path:'/',query:{user:res.data.id}});
            }else if(res.code === 40000){
              Toast.fail('用户名或密码错误');
            }else{
              Toast.fail('该用户未注册');
            }
          }).catch(()=>{
            console.log('验证不成功');
          })
        },
        handleLeft() {
        },
        handleRight() {
          this.$router.push("./signUp")
        }
    }
}
</script>

<style lang="less" scoped>
#login{

    min-height: 3000px;
    margin-top:@less-spacing-col-44;
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