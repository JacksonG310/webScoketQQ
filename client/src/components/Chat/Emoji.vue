<template>
  <div id="emoji">
    <ul>
      <li
        class="emoji-item"
        @click="selectEmoji(e)"
        v-for="(e, index) in emoji"
        :key="index"
      >
        {{ e }}
      </li>
    </ul>
    <div class="button-group">
      <van-button class="delete">
        <van-icon name="arrow-left" @click="back" />
        <p>退格</p>
      </van-button>
      <van-button class="send" @click="sendEmoji">
        <van-icon name="revoke" />
        <p>发送</p>
      </van-button>
    </div>
  </div>
</template>

<script>
import emoji from "../../assets/js/emoji";
export default {
  data() {
    return {
      emoji: emoji,
    };
  },
  methods: {
    selectEmoji(emoji) {
      this.$emit("selectEmoji", emoji);
    },
    sendEmoji(e) {
      this.$emit("sendMessage", e);
    },
    back() {
      this.$emit("handleBack");
    },
  },
};
</script>

<style scoped lang="less">
#emoji {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    .emoji-item {
      padding: 0.2rem;
      font-size: 0.4rem;
    }
  }
  .button-group {
    position: fixed;
    bottom: 2%;
    right: 10%;
    .delete,
    .send {
      font-size: 0.32rem;
      height: 0.8rem;
      margin: 0 0.1rem;
    }
    .delete {
      background-color: #fff;
    }
    .send {
      background-color: @less-background-color-enable;
    }
  }
}
</style>
