<template>
  <div id="dialog" :class="direction" ref="dialog">
    <div class="profile">
      <img :src="profile" alt="" />
    </div>
    <div class="content left-top">
      <span v-if="msg.types == 0">{{ msg.message }}</span>
      <span v-else-if="msg.types == 1">
        <img :src="msg.message" @click="showImg(msg.message)" />
      </span>
      <span v-else-if="msg.types == 2" @click="download(msg.message)">
        收到音频，请点击此条信息进行下载
      </span>
      <span v-else-if="msg.types == 3" @click="download(msg.message)">
        收到视频，请点击此条信息进行下载
      </span>
      <span v-else-if="msg.types == 4" @click="download(msg.message)">
        收到文件，请点击此条信息进行下载
      </span>
      <p class="time">发送时间:{{ sendTime }}</p>
    </div>
  </div>
</template>

<script>
import timeFormat from "../../assets/js/time-format";
export default {
  props: {
    direction: {
      type: String,
    },
    profile: {
      type: String,
    },
    msg: {
      type: Object,
      default: {},
    },
  },

  methods: {
    showImg(msg) {
      this.$emit("showImg", msg);
    },
    download(url) {
      const temp = url.split("/");
      const filename = temp[temp.length - 1];
      this.$http({
        url: "/chat/download",
        method: "POST",
        data: { filename },
        responseType: "blob",
      }).then((res) => {
        const blob = new Blob([res.data], {
          type: "mutipart/form-data",
        });
        console.log(blob);
        console.log(blob.size / 1024 / 1024);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.target = "_blank";
        link.download = filename;
        link.style.display = "none";
        link.click();
        URL.revokeObjectURL(blob);
      });
    },
  },
  mounted() {
    // console.log(this.msg.id);
  },
  computed: {
    sendTime() {
      return timeFormat(this.msg.createdAt);
    },
  },
};
</script>

<style scoped lang="less">
#dialog {
  margin: 0.2rem 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  &.left {
    justify-content: flex-start;
    .profile {
      margin-left: @less-spacing-row-16;
      margin-right: @less-spacing-row-10;
    }
    .content {
      background-color: #fff;
      border-radius: 0 0.2rem 0.2rem 0.2rem !important;
    }
  }
  &.right {
    flex-flow: row-reverse;
    .profile {
      margin-left: @less-spacing-row-10;
      margin-right: @less-spacing-row-16;
    }
    .content {
      word-wrap: break-word;
      word-break: break-all;
      border-radius: 0.2rem 0 0.2rem 0.2rem !important;
      background-color: #ffe431;
    }
  }
  .profile {
    display: flex;
    align-items: flex-start;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.2rem;
    }
  }
  .content {
    max-width: 4.8rem;
    min-height: 0.8rem;
    height: auto;
    padding: 0.18rem 0.24rem;
    background-color: #fff;
    font-size: @less-text-size-16;
    .time {
      font-size: @less-text-size-12;
      color: #333;
    }
    img {
      margin-top: 0.1rem;
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
