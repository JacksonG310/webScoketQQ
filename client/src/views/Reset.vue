<template>
  <div id="reset">
    <top-bar title="重置头像或密码" :padding="true">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </top-bar>
    <div class="main">
      <div class="profile">
        <img :src="profile" @click="drawer = true" alt="profile" />
        <input
          type="file"
          accept=".jpg,.png"
          ref="filer"
          @change="handleUpload"
          class="file-selection"
        />
      </div>
      <div class="name">大螃蟹</div>
      <van-button
        @click="resetPsw = true"
        v-show="!resetPsw"
        class="reset-password-button"
        round
        block
        type="info"
        native-type="submit"
        >重置密码</van-button
      >
      <div class="form-field" v-show="resetPsw">
        <van-form class="form">
          <div class="subtitle">请重新设置密码</div>
          <van-field
            border
            name="pwd"
            v-model="newPwd"
            :rules="pwdRule.pwd"
            :type="inputType"
            placeholder="请输入新密码"
          ></van-field>
          <van-icon
            name="closed-eye"
            class="eye-c"
            size=".5rem"
            v-show="!isEyeOpen"
            @click="isEyeOpen = !isEyeOpen"
          />
          <van-icon
            name="eye-o"
            class="eye-o"
            size=".5rem"
            v-show="isEyeOpen"
            @click="isEyeOpen = !isEyeOpen"
          />
        </van-form>
        <div class="submit-button-box">
          <van-button
            @click="handleSubmit"
            class="submit-button"
            :class="{ enable: submitable, disable: !submitable }"
            round
            block
            type="info"
            native-type="submit"
            >提交</van-button
          >
          <van-button
            @click="resetPsw = false"
            class="cancel-button"
            round
            block
            type="primary"
            native-type="submit"
            >取消</van-button
          >
        </div>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      size="25%"
      :with-header="false"
      direction="btt"
    >
      <p class="tips">头像仅支持jpg、png格式、大小小于2M的图片</p>
      <van-button
        class="upload"
        type="info"
        @click="$refs.filer.click(), (drawer = false)"
        block
        >更换头像</van-button
      >
      <van-button class="cancle" @click="drawer = false" type="info" block
        >取消</van-button
      >
    </el-drawer>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getHash } from "../assets/js/util/getHash";
import TopBar from "../components/Common/top-bar";
export default {
  components: { TopBar },
  data() {
    return {
      drawer: false,
      resetPsw: false,
      maxSize: 2 * 1024 * 1024,
      profile: "",
      isEyeOpen: false,
      newPwd: "",
      pwdRule: {
        pwd: [{ required: true, message: "请输入新密码" }],
      },
    };
  },
  methods: {
    // 上传头像
    async handleUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > this.maxSize) {
        Toast.fail("仅支持体积小于2M的图片");
        return;
      }
      const result = await getHash(file);
      const formData = new FormData();
      formData.append("filename", result.filename);
      formData.append("hash", result.hash);
      formData.append("file", file);
      formData.append("id", this.$route.query.id);
      formData.append("username", this.$route.query.username);
      const { data: res } = await this.$http.post("/upload", formData, {
        headers: { "Content-Type": "mutipart/form-data" },
      });
      if (res.code === 20000) {
        this.profile = res.path;
        Toast.success("头像上传成功");
      } else {
        Toast.fail("头像上传失败");
      }
    },
    // 修改密码
    async handleSubmit() {
      if (!this.submitable) {
        Toast.fail("请输入新密码");
        return;
      }
      const { data: res } = await this.$http.put("/updatePassword", {
        id: this.$route.query.id,
        password: this.newPwd,
      });
      if (res.code === 20000) {
        Toast.success("密码修改成功");
      } else {
        Toast.fail("密码修改出错，请重试");
      }
      this.newPwd = "";
    },
  },
  computed: {
    inputType() {
      return this.isEyeOpen ? "text" : "password";
    },
    submitable() {
      return this.newPwd.trim() !== "";
    },
  },
  created() {
    this.profile = this.$route.query.profile;
  },
};
</script>

<style scoped lang="less">
#reset {
  min-height: 100vh;
  margin-top: 0.88rem;
  .main {
    padding: 0 @less-spacing-row-28;
    text-align: center;
    height: auto;
    padding-top: 1.8rem;
    .profile {
      position: relative;
      img {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
      }
      .file-selection {
        display: none;
      }
    }
    .name {
      font-size: @less-text-size-20;
      font-weight: 600;
    }

    .form-field {
      position: relative;
      text-align: center;
      margin-top: 1rem;
      .form {
        position: relative;
      }
      .eye-o,
      .eye-c {
        position: absolute;
        right: 0.4rem;
        top: 0.7rem;
      }
      .subtitle {
        text-align: left;
        font-size: @less-text-size-20;
        color: #a3a4a8;
      }
    }
    .reset-password-button {
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
    .submit-button-box {
      position: relative;
      width: 100%;
      .submit-button,
      .cancel-button {
        margin: 0 auto;
        width: 5.2rem;
        margin-top: 1rem;
        color: @less-text-color;
        font-weight: 600;
        border: none;
        background-color: @less-background-color-enable;
      }
      .cancel-button {
        margin-top: 0.4rem;
        background-color: #1989fa;
        color: #fff;
      }
    }
  }
  .tips {
    display: block;
    text-align: center;
    font-size: @less-text-size-12;
    color: #a3a4a8;
    margin: 0.6rem 0;
  }
  .upload,
  .cancle {
    background-color: transparent;
    font-size: @less-text-size-20;
    border: 0;
    color: @less-color-error;
  }
  .cancle {
    color: @less-text-color;
  }
  .enable {
    background-color: @less-background-color-enable !important;
  }
  .disable {
    background-color: @less-background-color-disabled !important;
  }
}
</style>
