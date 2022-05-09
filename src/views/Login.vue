<template>
    <div id="login">
        <div class="top-bar">
            <span class="close-button">
                <router-link to="#">
                    <van-icon name="arrow-left" size="1.5rem" />
                </router-link>
            </span>
            <router-link to="/register"><span class="register-button">注册</span></router-link>
        </div>
        <div class="main-body">
            <div class="logo">
                <img src="../assets/images/login&register/QQ.png" alt="">
            </div>
            <div class="login-box">
                <div class="title-box">
                    <h1 class="title">登录</h1>
                    <p class="subtitle">您好，欢迎来到信科QQ2021!</p>
                </div>
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field name="用户名" label="用户名/邮箱" placeholder="请输入用户名或邮箱" />
                        <van-field type="password" name="密码" label="密码" placeholder="密码" />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            登录
                        </van-button>
                    </div>
                </van-form>

                <!-- <div class="form-box">
                    <form>
                        <input class="username" type="text" v-model="userInfo.data" placeholder="用户名/邮箱">
                        <input class="password" type="text" v-model="userInfo.password" placeholder="密码">
                    </form>
                    <p class="tip" v-show="tip">用户名或密码错误！</p>
                    <button class="login-button" @click="doLogin">登录</button> -->
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                data: "",
                password: "",
            },
            //密码错误提示
            tip: false
        }
    },
    methods: {
        goToSignUp() {
            this.$router.push("/register");
        },
        async doLogin() {
            const { data: res } = await this.$http.post("login", { userInfo: this.userInfo });
            console.log(res);
            if (res.code === 20000) {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                }
                this.$router.push("/");
            } else if (res.code === 40000) {
                this.tip = true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
#login {
    min-height: 100vh;
    background-color: #f7f8fa;

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 2.75rem;
        padding: 2rem 1rem;

        .close-button {
            display: inline-block;
            width: 1.05rem;
            height: 1.05rem;

            img {
                width: 100%;
            }
        }

        .register-button {
            width: 2.25rem;
            height: 1.56rem;
            font-family: Kanit;
            font-size: 1.12rem;
            color: #333333;
            font-weight: 500;
        }
    }

    .main-body {
        .logo {
            text-align: center;
            margin-top: 1.5rem;

            img {
                width: 10rem;
            }
        }
    }

    .login-box {
        .title-box {
            margin-top: 1rem;
            margin-left: 1rem;
            margin-bottom: 2rem;

            .title {
                width: 3.5rem;
                height: 2.5rem;
                font-family: PingFangSC-Medium;
                font-size: @less-text-size-lg;
                color: #272832;
                font-weight: 800;
            }

            .subtitle {
                font-size: @less-text-size-base;
                color: rgba(39, 40, 50, 0.50);
                letter-spacing: 0;
                font-weight: 400;
            }
        }

        .van-button {
            border: none;
            color: @less-text-color;
            background-color: @less-background-color-enable;
        }
    }
}
</style>