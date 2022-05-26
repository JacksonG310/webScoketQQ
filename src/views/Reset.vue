<template>
    <div id="reset">
        <top-bar title="重置头像或密码" :padding="true">
            <template slot="left">
                <van-icon name="arrow-left" />
            </template>
        </top-bar>
        <div class="main">
                <div class="profile">
                    <img src="../assets/images/index/profile-03.jpeg" alt="profile" />
                    <input type="file" >
                </div>
                <div class="name">大螃蟹</div>
                <van-button @click="resetPsw = true" v-show="!resetPsw" class="reset-password-button" round block type="info" native-type="submit">重置密码</van-button>
                <div class="form-field" v-show="resetPsw">
                    <van-form>
                        <div class="subtitle">请重新设置密码</div>
                        <van-field border type="password" placeholder="请输入新密码"></van-field>
                    </van-form>
                    <div class="submit-button-box">
                        <van-button class="submit-button" round block type="info" native-type="submit">提交</van-button>
                        <van-button @click="resetPsw = false" class="cancel-button" round block type="primary" native-type="submit">取消</van-button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
export default {
    components:{TopBar},
    data() {
        return {
            resetPsw:false,
        }
    },
    
}
</script>

<style scoped lang="less">
    #reset{
        min-height: 100vh;
        margin-top: .88rem;
        .main{
            padding: 0 @less-spacing-row-28;
            text-align: center;
            height: auto;
            padding-top: 1.8rem;
            .profile{
                position: relative;
                img{
                    width: 3.6rem;
                    height: 3.6rem;
                    border-radius: 50%;
                }
                &::after{
                    display: none;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    content: ' ';
                    width: 3.6rem;
                    height: 3.6rem;
                    border-radius: 50%;
                    background: url("../assets/images/reset/camera.png") rgba(0, 0, 0, .6) no-repeat;
                    background-position: center center;
                    background-size: 1rem 1rem;
                }
            }
            .name{
                font-size: @less-text-size-20;
                font-weight: 600;
            }
      
            .form-field{
                position: relative;
                text-align: center;
                margin-top: 1rem;
                .subtitle{
                    text-align: left;
                    font-size: @less-text-size-20;
                    color:#a3a4a8;
                }
                   
            }
            .reset-password-button{
                position: absolute;
                top: 8.48rem;
                left: 1.16rem;
                margin: 0 auto;
                width: 5.2rem;
                margin-top: 1rem;
                font-weight: 600;
                border: none;
                color: @less-text-color-inverse;
                 background-color: @less-color-error;
            }
            .submit-button-box{
                position: relative;
                width: 100%;
                .submit-button,.cancel-button{
                    margin: 0 auto;
                    width: 5.2rem;
                    margin-top: 1rem;
                    color: @less-text-color;
                    font-weight: 600;
                    border: none;
                    background-color: @less-background-color-enable;
                }
                .cancel-button{
                    margin-top: .4rem;
                    background-color: #1989fa;
                    color: #fff;
                }
            }
        }
    }
</style>