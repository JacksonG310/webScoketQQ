<template>
    <div id="reset">
        <top-bar title="重置密码" :padding="true">
            <template slot="left">
                <van-icon name="arrow-left" />
            </template>
        </top-bar>
        <div class="main">
                <div class="profile">
                    <img src="../assets/images/index/profile-03.jpeg" alt="profile" />
                </div>
                <div class="name">大螃蟹</div>
                <div class="form-field">
                    <van-form>
                        <div class="subtitle">请重新设置密码</div>
                        <van-field border type="password" placeholder="请输入新密码"></van-field>
                    </van-form>
                    <div class="submit-button-box">
                        <van-button class="submit-button" round block type="info" native-type="submit">提交</van-button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
export default {
    components:{TopBar}
}
</script>

<style lang="less">
    #reset{
        min-height: 100vh;
        margin-top: .88rem;
        .main{
            padding: 0 @less-spacing-row-28;
            text-align: center;
            height: auto;
            padding-top: .8rem;
            .profile{
                img{
                    width: 1.6rem;
                    height: 1.6rem;
                    border-radius: 50%;
                }
            }
            .name{
                font-size: @less-text-size-20;
                font-weight: 600;
            }
            .form-field{
                margin-top: 1rem;
                .subtitle{
                    text-align: left;
                    font-size: @less-text-size-20;
                    color:#a3a4a8;
                }   
            }
            .submit-button-box{
                width: 100%;
                .submit-button{
                    margin: 0 auto;
                    width: 5.2rem;
                    margin-top: 1rem;
                    color: @less-text-color;
                    font-weight: 600;
                    border: none;
                    background-color: @less-background-color-enable;
                }
            }
        }
    }
</style>