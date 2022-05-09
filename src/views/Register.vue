<template>
    <div id="register">
        <div class="top-bar">
            <router-link to="/login">
                <van-icon name="arrow-left" size="1.5rem" />
            </router-link>
            <router-link to="/login">
                <van-icon name="cross" size="1.5rem" />
            </router-link>
        </div>
        <div class="main-body">
            <div class="logo">
                <img src="../assets/images/login&register/QQ.png" alt="">
            </div>
            <div class="register-box">

                <div class="form-box">
                    <h1 class="title">注册</h1>
                    <van-form>
                        <van-cell-group inset>
                            <van-field name="用户名" label="用户名" placeholder="请输入用户名">
                            </van-field>
                            <van-field name="邮箱" label="邮箱" placeholder="请输入邮箱">
                            </van-field>
                            <van-field name="密码" label="密码" placeholder="请输入密码">
                            </van-field>
                        </van-cell-group>
                        <div class="register-button">
                            <van-button round block type="primary" native-tyoe="submit">注册
                            </van-button>
                        </div>

                    </van-form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                username: "",
                email: "",
                password: ""
            },
            isUserOccupy: false,   //用户名是否占用
            isEmailOccupy: true,  //邮箱是否被占用
            look: false,     //是否显示密码
            isUsernameValid: false,//用户名是否合法
            isEmailValid: true,  //邮箱是否合法
        }
    },
    methods: {
        matchEmail(e) {
            let { value } = e.target;
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            this.isValid = reg.test(value);
        },
        async matchUsername() {
            if (this.userInfo.username.trim() == "") {
                this.isUsernameValid = false;
                return;
            } else {
                this.isUsernameValid = true;
            }
            const { data: res } = await this.$http.post("/signup/judge", { data: this.userInfo.username, type: 0 });
            if (res.code == "20000") {
                if (res.used) {
                    this.isUserOccupy = true;
                } else {
                    this.isUserOccupy = false;
                }
            }
        },

    },
    computed: {
        isClickable() {
            return !this.isUserOccupy && !this.isEmailOccupy && this.isEmailValid && this.isUsernameValid;
        }
    }
}
</script>

<style lang="less" scoped>
#register {
    min-height: 100vh;
    background-color: #f7f8fa;

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 2.75rem;
        padding: 2rem 1rem;
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

    .register-box {
        .title {
            width: 3.5rem;
            height: 2.5rem;
            margin-left: 1rem;
            margin-bottom: 1rem;
            font-size: @less-text-size-lg;
            color: #272832;
            font-weight: 800;
        }

        .form-box {
            text-align: center;
            width: 100%;
            margin-top: .5rem;

            .register-button {
                margin: 1rem;
                font-weight: 500;

                .van-button {
                    background-color: @less-background-color-disabled;
                    border: none;
                    font-size: 1rem;
                    color: #FFFFFF;
                }
            }

            .enable {
                background-color: @less-background-color-enable;
                color: #272832;
            }
        }

    }
}
</style>