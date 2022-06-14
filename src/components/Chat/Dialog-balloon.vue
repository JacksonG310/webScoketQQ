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
      <span v-else-if="msg.types == 4"></span>
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
