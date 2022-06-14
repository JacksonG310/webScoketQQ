<template>
  <div id="file">
    <ul>
      <li
        class="item"
        v-for="(o, index) in options"
        @click="selectFile(index, o.type)"
        :key="index"
      >
        <span class="icon"><van-icon :name="o.icon" size=".72rem" /></span>
        <p class="name">{{ o.name }}</p>
        <input
          ref="input"
          type="file"
          :accept="o.accept"
          style="display: none"
          @change="handleChange($event, o.type)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { getHash } from "../../assets/js/util/getHash";
export default {
  data() {
    return {
      options: [
        { name: "图片", icon: "photo", type: 1, accept: ".png,.jpg,.jpeg" },
        { name: "音频", icon: "audio", type: 2, accept: ".mp3,.aac" },
        { name: "视频", icon: "video", type: 3, accept: ".mp4,.3pg,.avi,.m4v" },
        { name: "文件", icon: "wap-nav", type: 4 },
      ],
    };
  },
  methods: {
    selectFile(i) {
      this.$refs.input[i].click();
    },
    async handleChange(e, type) {
      const file = e.target.files[0];
      if (!file) return;
      this.$emit("fileChange", { file, type });
    },
  },
};
</script>

<style lang="less">
#file {
  width: 100%;
  height: 100%;
  overflow: scroll;
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 25%;
      margin-bottom: 0.4rem;
      .icon {
        margin: 0 auto;
        display: block;
        margin-bottom: 0.1rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.24rem;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .name {
        text-align: center;
        font-size: 0.24rem;
      }
    }
  }
}
</style>
