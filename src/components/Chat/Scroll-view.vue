<template>
  <div
    id="scrollView"
    @scroll="getScroll"
    ref="scroll"
    :style="`top:${top};bottom:${bottom};background-color:${backColor};`"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    top: {
      type: String,
      default: "44px",
    },
    bottom: {
      type: String,
      default: "50px",
    },
    backColor: {
      type: String,
      default: "#fff",
    },
    dataID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
    };
  },
  methods: {
    //滚动事件
    getScroll(e) {
      this.scrollTop = e.target.scrollTop; // 当前滚动条位置
      this.clientHeight = e.target.clientHeight; // 设备窗口的高度（不会变）
      this.scrollHeight = e.target.scrollHeight; // 元素总高度
      if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        this.$emit("reachBottom");
      }
      if (this.scrollTop == 0) {
        this.$emit("reachTop");
      }
    },
    // 滚动到指定位置
    scrollInto() {
      if (!this.dataID) return;
      const children = this.$el.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].getAttribute("data-id") == this.dataID) {
          children[i].scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "end", // 上边框与视窗顶部平齐
          });
        }
      }
    },
  },
  activated() {
    this.$el.scrollTop = this.scrollTop;
    this.$emit("getScrollTop", { scrollTop: this.scrollTop });
  },

  updated() {
    this.scrollInto();
  },
  mounted() {
    this.scrollInto();
  },
};
</script>
<style scoped>
#scrollView {
  width: 100%;
  z-index: 1;
  left: 0px;
  position: fixed;
  overflow-y: scroll;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  background-color: #f4f4f4 !important;
}
</style>
