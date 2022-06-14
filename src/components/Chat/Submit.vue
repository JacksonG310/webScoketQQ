<template>
  <div id="submit">
    <div class="top">
      <div class="left">
        <van-icon name="add-o" size=".56rem" @click="drawer = true" />
      </div>
      <div class="center">
        <textarea
          @keyup.enter="sendMessage"
          @focus="handleFocus"
          v-model="typing"
          class="input-box"
          name="input"
          id="input-area"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="right" @click="isOpen = isFile || isEmoji">
        <!-- <van-button type="primary" class="send-message"> 发送 </van-button> -->
        <van-icon
          name="smile-o"
          size=".56rem"
          class="emoji"
          @click="(isEmoji = !isEmoji), (isFile = false)"
        />
        <van-icon
          name="add-o"
          size=".56rem"
          @click="(isFile = !isFile), (isEmoji = false)"
        />
      </div>
    </div>
    <div class="more-options" :class="{ fold: !isOpen, extension: isOpen }">
      <emoji
        @sendMessage="sendMessage"
        @selectEmoji="selectEmoji"
        @handleBack="handleBack"
        v-show="isEmoji && isOpen"
      ></emoji>
      <file v-show="isOpen && isFile" @fileChange="sendFile"></file>
    </div>
  </div>
</template>
<script>
import Emoji from "./Emoji.vue";
import File from "./File.vue";
export default {
  components: { Emoji, File },
  data() {
    return {
      typing: "",
      drawer: false,
      // 视窗高度
      viewPortHeight: 0,
      // 是否打开折叠窗口
      isOpen: false,
      // emoji表情
      isEmoji: false,
      // 文件发送
      isFile: false,
    };
  },
  methods: {
    // 发送消息
    sendMessage(e) {
      this.typing = this.typing.substring(0, this.typing.length - 1);
      if (this.typing.length <= 0) return;
      if (e.keyCode == 13) e.returnValue = false;
      this.$emit("handleSend", this.typing);
      this.typing = "";
    },
    // 处理表情选择
    selectEmoji(emoji) {
      this.typing += emoji;
    },
    // 处理退格
    handleBack() {
      if (this.typing.length > 0) {
        this.typing = this.typing.substring(0, this.typing.length - 1);
      }
    },
    // 处理文件选择
    handleClick(type) {
      this.$refs[`selector-${type}`][0].click();
    },
    // 处理文件发送
    sendFile(fileInfo) {
      this.$emit("handleSendFile", fileInfo);
    },
    // 获取自身高度
    getClientHight() {
      this.$nextTick(() => {
        console.log(this.$el.offsetHeight);
        this.$emit("getSubmitHeight", this.$el.offsetHeight);
      });
    },
    // 获得焦点时扩展窗口关闭
    handleFocus() {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        return;
      }
    },
  },
  mounted() {
    this.getClientHight();
  },
  updated() {
    this.getClientHight();
  },
};
</script>

<style scoped lang="less">
#submit {
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
  min-height: 0.98rem;
  // padding: 0 @less-spacing-row-16;
  background-color: #f4f4f4;
  border-top: 1px solid #ccc;
  .top {
    width: 100%;
    height: 0.98rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    vertical-align: top;

    .left {
      vertical-align: top;
      text-align: center;
      padding-top: 0.24rem;
      .van-icon {
        vertical-align: top;
      }
    }
    .center {
      padding: 0.14rem @less-spacing-row-10;
      box-sizing: border-box;
      .input-box {
        vertical-align: top;
        flex: 1;
        font-size: @less-text-size-16;
        border: none;
        padding: 0.16rem;
        border-radius: 0.1rem;
        max-width: 4.8rem;
        height: 0.72rem;
        resize: none;
        overflow: none;
      }
    }
    .right {
      padding-top: 0.24rem;
      vertical-align: top;
      display: flex;
      justify-content: space-around;
      .emoji {
        margin-right: 0.3rem;
      }
      .van-icon {
        vertical-align: top;
      }
      // .send-message {
      //   vertical-align: top;
      //   width: 1.36rem;
      //   height: 0.72rem;
      //   border: none;
      //   color: @less-text-color;
      //   background-color: @less-background-color-enable;
      // }
    }
  }
  .more-options {
    width: 100%;
    background-color: #f4f4f4;
  }
  .fold {
    height: 0;
  }
  .extension {
    height: 4.6rem !important;
    padding: 0.2rem;
    transition: 0.2s linear;
  }
}
</style>
