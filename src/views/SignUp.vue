<template>
    <div id="signUp">
      <top-bar :padding="true" @click-left="handleLeft" @click-right="handleRight">
        <template slot="left">
          <van-icon name="arrow-left" />
        </template>
        <template slot="right">
          <van-icon name="cross" />
        </template>
      </top-bar>
        <div class="main">
            <div class="logo">
                <img src="../assets/images/login&register/QQ.png" alt="logo">
            </div>
          <div class="form-field">
            <div class="title">
              <h3>注册</h3>
            </div>
            <van-form ref="signUpForm">
              <van-field 
                name="username"
                v-model="signUpForm.username" 
                label="用户名" 
                placeholder="请输入用户名"
                :rules="signUpFormRules.username"></van-field>
              <van-field 
                name="email"
                v-model="signUpForm.email" 
                label="邮箱" 
                placeholder="请输入邮箱" 
                :rules="signUpFormRules.email"></van-field>
              <van-field 
                name="password"
                v-model="signUpForm.password" 
                label="密码" 
                placeholder="请输入密码"
                type="password"   
                :rules="signUpFormRules.password"></van-field>
              <van-field 
                name="again"
                v-model="signUpForm.again"
                label="确认密码" 
                placeholder="请再次输入密码" 
                type="password" 
                 :rules="signUpFormRules.again"></van-field>
            </van-form>
              <van-button 
                class="signUp-button enable"
                 round block type="info" 
                 native-type="submit"
                 @click="submit">提交</van-button>
          </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import TopBar from "../components/Common/top-bar"
export default {
  components:{ TopBar },
    data() {
        return {
          //注册表单
          signUpForm:{
            username:"",
            email:"",
            password:"",
            again:""
          },
          //邮箱正则
          pattern:/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
          // 表单验证规则
          signUpFormRules:{
            username:[
              {required:true,message:'请输入用户名'},
              {validator:this.usernameOccupy,message:'用户名已被占用'}
            ],
            email:[
              {required:true,message:'请输入邮箱'},
              {validator:()=>this.pattern.test(this.signUpForm.email),message:'邮箱格式不合法'},
              {validator:this.emailOccupy,message:'邮箱已被占用'}
            ],
            password:[{required:true,message:'请输入密码'}],
            again:[
              {required:true,message:'请再次输入密码'},
              {validator:this.comfirmPwd,message:'请确保两次输入的密码一致'}
            ]
          }
        }
    },
    methods: {
      async usernameOccupy(){
        if(this.signUpForm.username.trim() == '') return;
        const {data:res} =  await this.$http.post("/signup/judge",{data:this.signUpForm.username,type:0});
        return new Promise((resolve)=>{
            resolve(!res.used);
        })
      },
      async emailOccupy(){
        if(this.signUpForm.email.trim() == '') return;
        const {data:res} =  await this.$http.post("/signup/judge",{data:this.signUpForm.email,type:1});
        return new Promise((resolve)=>{
            resolve(!res.used);
        })
      },
      comfirmPwd(){
        const {password,again} = this.signUpForm;
          return new Promise((resolve)=>{
            resolve(password == again);
          })
      },
      submit(){
          this.$refs.signUpForm.validate().then(async()=>{
            Toast.loading({
              message:'加载中...',
              forbidClick:true,
            })
            const {data:res} = await this.$http.post("signup/add",{signUpForm:this.signUpForm});
            if(res.code === 20000){
              Toast.success('注册成功');
            }
          }).catch(()=>{
            console.log("验证不通过");
          })
      },
      handleLeft(){
        this.$router.back();
      },
      handleRight(){
        this.$router.push("/login");
      }
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