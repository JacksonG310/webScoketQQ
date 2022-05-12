<template>
  <div id="cell">
    <div class="cell-title">{{ title }}</div>
    <div class="cell-center">
      <span class="cell-content" >
        <slot></slot>
      </span>
    </div>
    <div class="cell-right" v-show="isLink">
      <van-icon name="arrow" size=".28rem" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    isLink: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="less">
#cell {
  width: 100%;
  min-height: 1.12rem;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem @less-spacing-row-16;

  .cell-title {
    width: 0.94rem;
    height: 100%;
    font-size: @less-text-size-16;
  }
  .cell-center {
    flex: 1;
    width: 0;
    .cell-content {
      font-size: @less-text-size-16;
      color: #b2b2b6;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      img {
        width: 1.08rem;
        height: 1.08rem;
        border-radius: 0.2rem;
      }
    }
  }
  .cell-title,
  .cell-center,
  .cell-right {
    display: flex;
    align-items: center;
  }
}
</style>